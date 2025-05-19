<?php
namespace App\Controller;

use App\Entity\Admin;
use App\Repository\AdminRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class AdminController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private AdminRepository $adminRepository;
    private UserPasswordHasherInterface $passwordHasher;
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(
        EntityManagerInterface $entityManager,
        AdminRepository $adminRepository,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $jwtManager
    ) {
        $this->entityManager = $entityManager;
        $this->adminRepository = $adminRepository;
        $this->passwordHasher = $passwordHasher;
        $this->jwtManager = $jwtManager;
    }

    /**
     * @Route("/api/admins/login", name="login_admin", methods={"POST"})
     */
    public function loginAdmin(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['password'])) {
            return $this->json(['error' => 'Faltan datos de login.'], Response::HTTP_BAD_REQUEST);
        }

        $admin = $this->adminRepository->findOneBy(['email' => $data['email']]);
        if (!$admin) {
            return $this->json(['error' => 'Correo electrónico no registrado.'], Response::HTTP_NOT_FOUND);
        }

        if (!$this->passwordHasher->isPasswordValid($admin, $data['password'])) {
            return $this->json(['error' => 'Contraseña incorrecta.'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $this->jwtManager->create($admin);

        return $this->json([
            'message' => 'Login exitoso',
            'id' => $admin->getId(),
            'name' => $admin->getName(),
            'email' => $admin->getEmail(),
            'token' => $token,
        ]);
    }

    /**
     * @Route("/api/admins", name="create_admin", methods={"POST"})
     */
    public function createAdmin(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
            return $this->json(['error' => 'Faltan datos obligatorios.'], Response::HTTP_BAD_REQUEST);
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->json(['error' => 'El email no es válido.'], Response::HTTP_BAD_REQUEST);
        }

        $admin = new Admin();
        $admin->setName($data['name']);
        $admin->setEmail($data['email']);

        $hashedPassword = $this->passwordHasher->hashPassword($admin, $data['password']);
        $admin->setPassword($hashedPassword);

        $this->entityManager->persist($admin);
        $this->entityManager->flush();

        return $this->json(['message' => 'Administrador creado exitosamente'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/admins/{id}", name="get_admin", methods={"GET"})
     */
    public function getAdmin(int $id): Response
    {
        $admin = $this->adminRepository->find($id);

        if (!$admin) {
            return $this->json(['error' => 'Administrador no encontrado'], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            'id' => $admin->getId(),
            'name' => $admin->getName(),
            'email' => $admin->getEmail(),
        ]);
    }
}
