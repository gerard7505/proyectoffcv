<?php
namespace App\Controller;

use App\Entity\Jugador;
use App\Repository\JugadorRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class JugadorController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private JugadorRepository $jugadorRepository;
    private UserPasswordHasherInterface $passwordHasher;
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(
        EntityManagerInterface $entityManager, 
        JugadorRepository $jugadorRepository, 
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $jwtManager
    ) {
        $this->entityManager = $entityManager;
        $this->jugadorRepository = $jugadorRepository;
        $this->passwordHasher = $passwordHasher;
        $this->jwtManager = $jwtManager;
    }

    #[Route('/api/jugadores', name: 'create_jugador', methods: ['POST'])]
    public function createJugador(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (
            empty($data['name']) || empty($data['lastName']) || empty($data['email']) || empty($data['dni']) ||
            empty($data['address']) || empty($data['city']) || empty($data['dateOfBirth']) || empty($data['password'])
        ) {
            return $this->json(['error' => 'Faltan datos obligatorios.'], Response::HTTP_BAD_REQUEST);
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->json(['error' => 'El correo electrónico no es válido.'], Response::HTTP_BAD_REQUEST);
        }

        if (!preg_match('/^[0-9]{8}[A-Za-z]$/', $data['dni'])) {
            return $this->json(['error' => 'El DNI no es válido.'], Response::HTTP_BAD_REQUEST);
        }

        $jugador = new Jugador();
        $jugador->setName($data['name']);
        $jugador->setLastName($data['lastName']);
        $jugador->setEmail($data['email']);
        $jugador->setDni($data['dni']);
        $jugador->setAddress($data['address']);
        $jugador->setCity($data['city']);
        $jugador->setDateOfBirth(new \DateTime($data['dateOfBirth']));
        $hashedPassword = $this->passwordHasher->hashPassword($jugador, $data['password']);
        $jugador->setPassword($hashedPassword);

        $this->entityManager->persist($jugador);
        $this->entityManager->flush();

        return $this->json(['message' => 'Jugador creado exitosamente'], Response::HTTP_CREATED);
    }

    #[Route('/api/jugadores/login', name: 'login_jugador', methods: ['POST'])]
    public function loginJugador(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['password'])) {
            return $this->json(['error' => 'Faltan datos de login.'], Response::HTTP_BAD_REQUEST);
        }

        $jugador = $this->jugadorRepository->findOneBy(['email' => $data['email']]);
        if (!$jugador) {
            return $this->json(['error' => 'Correo electrónico no registrado.'], Response::HTTP_NOT_FOUND);
        }

        if (!$this->passwordHasher->isPasswordValid($jugador, $data['password'])) {
            return $this->json(['error' => 'Contraseña incorrecta.'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $this->jwtManager->create($jugador);

        return $this->json([
            'message'  => 'Login exitoso',
            'id'       => $jugador->getId(),
            'name'     => $jugador->getName(),
            'lastName' => $jugador->getLastName(),
            'email'    => $jugador->getEmail(),
            'token'    => $token,
        ]);
    }

    #[Route('/api/jugadores/email/{email}', name: 'get_jugador_by_email', methods: ['GET'])]
    public function getJugadorByEmail(string $email): Response
    {
        $jugador = $this->jugadorRepository->findOneBy(['email' => $email]);
        if (!$jugador) {
            return $this->json(['error' => 'Jugador no encontrado'], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            'id'          => $jugador->getId(),
            'name'        => $jugador->getName(),
            'lastName'    => $jugador->getLastName(),
            'email'       => $jugador->getEmail(),
            'dni'         => $jugador->getDni(),
            'address'     => $jugador->getAddress(),
            'city'        => $jugador->getCity(),
            'dateOfBirth' => $jugador->getDateOfBirth()->format('Y-m-d'),
        ]);
    }

    #[Route('/api/jugadores/email/{email}', name: 'update_jugador_by_email', methods: ['PUT'])]
    public function updateJugadorByEmail(Request $request, string $email): Response
    {
        $jugador = $this->jugadorRepository->findOneBy(['email' => $email]);
        if (!$jugador) {
            return $this->json(['error' => 'Jugador no encontrado.'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $jugador->setName($data['name']);
        }
        if (isset($data['lastName'])) {
            $jugador->setLastName($data['lastName']);
        }
        if (isset($data['email'])) {
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                return $this->json(['error' => 'El correo electrónico no es válido.'], Response::HTTP_BAD_REQUEST);
            }
            $jugador->setEmail($data['email']);
        }
        if (isset($data['dni'])) {
            if (!preg_match('/^[0-9]{8}[A-Za-z]$/', $data['dni'])) {
                return $this->json(['error' => 'El DNI no es válido.'], Response::HTTP_BAD_REQUEST);
            }
            $jugador->setDni($data['dni']);
        }
        if (isset($data['address'])) {
            $jugador->setAddress($data['address']);
        }
        if (isset($data['city'])) {
            $jugador->setCity($data['city']);
        }
        if (isset($data['dateOfBirth'])) {
            try {
                $fecha = new \DateTime($data['dateOfBirth']);
                $jugador->setDateOfBirth($fecha);
            } catch (\Exception $e) {
                return $this->json(['error' => 'Formato de fecha inválido.'], Response::HTTP_BAD_REQUEST);
            }
        }

        if (!empty($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($jugador, $data['password']);
            $jugador->setPassword($hashedPassword);
        }

        $this->entityManager->flush();

        return $this->json(['message' => 'Datos actualizados correctamente.']);
    }
}
