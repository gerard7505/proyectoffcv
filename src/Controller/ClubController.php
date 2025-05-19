<?php
namespace App\Controller;

use App\Entity\Club;
use App\Repository\ClubRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class ClubController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ClubRepository $clubRepository;
    private UserPasswordHasherInterface $passwordHasher;
    private JWTTokenManagerInterface $jwtManager;
    public function __construct(
        EntityManagerInterface $entityManager,
        ClubRepository $clubRepository,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $jwtManager
    ) {
        $this->entityManager = $entityManager;
        $this->clubRepository = $clubRepository;
        $this->passwordHasher = $passwordHasher;
        $this->jwtManager = $jwtManager;
    }

    /**
     * @Route("/api/clubs/login", name="login_club", methods={"POST"})
     */
    public function loginClub(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['password'])) {
            return $this->json(['error' => 'Faltan datos de login.'], Response::HTTP_BAD_REQUEST);
        }

        $club = $this->clubRepository->findOneBy(['email' => $data['email']]);
        if (!$club) {
            return $this->json(['error' => 'Correo electrónico no registrado.'], Response::HTTP_NOT_FOUND);
        }

        if (!$this->passwordHasher->isPasswordValid($club, $data['password'])) {
            return $this->json(['error' => 'Contraseña incorrecta.'], Response::HTTP_UNAUTHORIZED);
        }

        // Generar token JWT
        $token = $this->jwtManager->create($club);

        return $this->json([
            'message' => 'Login exitoso',
            'id' => $club->getId(),
            'name' => $club->getName(),
            'email' => $club->getEmail(),
            'city' => $club->getCity(),
            'token' => $token, // Devuelve el token JWT
        ]);
    }

    /**
     * @Route("/api/clubs", name="create_club", methods={"POST"})
     */
    public function createClub(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['name']) || empty($data['email']) || empty($data['city']) || empty($data['password'])) {
            return $this->json(['error' => 'Faltan datos obligatorios.'], Response::HTTP_BAD_REQUEST);
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->json(['error' => 'El email no es válido.'], Response::HTTP_BAD_REQUEST);
        }

        // Crear un nuevo club
        $club = new Club();
        $club->setName($data['name']);
        $club->setEmail($data['email']);
        $club->setCity($data['city']);

        // Cifrar la contraseña antes de guardarla
        $hashedPassword = $this->passwordHasher->hashPassword($club, $data['password']); 
        $club->setPassword($hashedPassword);

        // Guardar el club en la base de datos
        $this->entityManager->persist($club);
        $this->entityManager->flush();

        return $this->json(['message' => 'Club creado exitosamente'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/clubs/email/{email}", name="get_club_by_email", methods={"GET"})
     */
    public function getClubByEmail(string $email): Response
    {
        $club = $this->clubRepository->findOneBy(['email' => $email]);

        if (!$club) {
            return $this->json(['error' => 'Club no encontrado.'], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            'id' => $club->getId(),
            'name' => $club->getName(),
            'email' => $club->getEmail(),
            'city' => $club->getCity(),
        ]);
    }

    /**
     * @Route("/api/clubs/email/{email}", name="update_club_by_email", methods={"PUT"})
     */
    public function updateClubByEmail(Request $request, string $email): Response
    {
        $club = $this->clubRepository->findOneBy(['email' => $email]);

        if (!$club) {
            return $this->json(['error' => 'Club no encontrado.'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $club->setName($data['name']);
        }

        if (isset($data['email'])) {
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                return $this->json(['error' => 'El correo electrónico no es válido.'], Response::HTTP_BAD_REQUEST);
            }
            $club->setEmail($data['email']);
        }

        if (isset($data['city'])) {
            $club->setCity($data['city']);
        }

        if (!empty($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($club, $data['password']);
            $club->setPassword($hashedPassword);
        }

        $this->entityManager->flush();

        return $this->json(['message' => 'Datos del club actualizados correctamente.']);
    }
}
