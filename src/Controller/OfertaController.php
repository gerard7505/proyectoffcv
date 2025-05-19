<?php

namespace App\Controller;


use App\Entity\Oferta;
use App\Entity\JugadoresOfertas;
use App\Entity\Jugador;
use App\Repository\OfertaRepository;
use App\Repository\ClubRepository;
use App\Repository\JugadoresOfertasRepository;
use App\Repository\JugadorRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class OfertaController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private OfertaRepository $ofertaRepository;
    private ClubRepository $clubRepository;
    private JugadoresOfertasRepository $jugadoresOfertasRepository;
    private JugadorRepository $jugadorRepository;

    public function __construct(
        EntityManagerInterface         $entityManager,
        OfertaRepository               $ofertaRepository,
        ClubRepository                 $clubRepository,
        JugadoresOfertasRepository     $jugadoresOfertasRepository,
        JugadorRepository              $jugadorRepository
    ) {
        $this->entityManager             = $entityManager;
        $this->ofertaRepository          = $ofertaRepository;
        $this->clubRepository            = $clubRepository;
        $this->jugadoresOfertasRepository = $jugadoresOfertasRepository;
        $this->jugadorRepository         = $jugadorRepository;
    }

    /**
     * @Route("/api/ofertas/categorias", name="obtener_categorias", methods={"GET"})
     */
    public function obtenerCategorias(): JsonResponse
    {
        $categorias = $this->ofertaRepository->createQueryBuilder('o')
            ->select('DISTINCT o.categoria')
            ->getQuery()
            ->getResult();
        $categorias = array_map(fn($c) => $c['categoria'], $categorias);

        return new JsonResponse($categorias);
    }

    /**
     * @Route(
     *     "/api/ofertas/{id}",
     *     name="eliminar_oferta",
     *     methods={"DELETE"},
     *     requirements={"id"="\d+"}
     * )
     */
    public function eliminarOferta(int $id): JsonResponse
    {
        $oferta = $this->ofertaRepository->find($id);
        if (!$oferta) {
            return new JsonResponse(['error' => 'Oferta no encontrada.'], JsonResponse::HTTP_NOT_FOUND);
        }
        $this->entityManager->remove($oferta);
        $this->entityManager->flush();

        return new JsonResponse(['mensaje' => 'Oferta eliminada correctamente.']);
    }

    /**
     * @Route("/api/ofertas", name="crear_oferta", methods={"POST"})
     */
    public function crearOferta(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (empty($data['club_id']) || empty($data['titulo']) || empty($data['descripcion'])
            || empty($data['fecha_inicio']) || empty($data['fecha_fin']) || empty($data['categoria'])
        ) {
            return new JsonResponse(['error' => 'Faltan datos obligatorios.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        try {
            $fechaInicio = new \DateTime($data['fecha_inicio']);
            $fechaFin    = new \DateTime($data['fecha_fin']);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Fechas inválidas.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $club = $this->clubRepository->find($data['club_id']);
        if (!$club) {
            return new JsonResponse(['error' => 'Club no existe.'], JsonResponse::HTTP_NOT_FOUND);
        }

        $oferta = (new Oferta())
            ->setClub($club)
            ->setTitulo($data['titulo'])
            ->setDescripcion($data['descripcion'])
            ->setFechaInicio($fechaInicio)
            ->setFechaFin($fechaFin)
            ->setCategoria($data['categoria']);

        $this->entityManager->persist($oferta);
        $this->entityManager->flush();

        return new JsonResponse(['mensaje' => 'Oferta creada correctamente.'], JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/api/ofertas", name="listar_ofertas", methods={"GET"})
     */
    public function listarOfertas(): JsonResponse
    {
        $ofertas = $this->ofertaRepository->findAll();
        $data = array_map(fn(Oferta $o) => [
            'id'            => $o->getId(),
            'titulo'        => $o->getTitulo(),
            'descripcion'   => $o->getDescripcion(),
            'fecha_inicio'  => $o->getFechaInicio()->format('Y-m-d'),
            'fecha_fin'     => $o->getFechaFin()->format('Y-m-d'),
            'estado'        => $o->getEstado(),
            'fecha_creacion'=> $o->getFechaCreacion()->format('Y-m-d H:i:s'),
            'categoria'     => $o->getCategoria(),
        ], $ofertas);

        return new JsonResponse($data);
    }

    /**
     * @Route("/api/ofertas/{id}", name="ver_oferta", methods={"GET"})
     */
    public function verOferta(int $id): JsonResponse
    {
        $oferta = $this->ofertaRepository->find($id);
        if (!$oferta) {
            return new JsonResponse(['error' => 'Oferta no encontrada.'], JsonResponse::HTTP_NOT_FOUND);
        }

        $data = [
            'id'             => $oferta->getId(),
            'titulo'         => $oferta->getTitulo(),
            'descripcion'    => $oferta->getDescripcion(),
            'fecha_inicio'   => $oferta->getFechaInicio()->format('Y-m-d'),
            'fecha_fin'      => $oferta->getFechaFin()->format('Y-m-d'),
            'estado'         => $oferta->getEstado(),
            'fecha_creacion' => $oferta->getFechaCreacion()->format('Y-m-d H:i:s'),
            'categoria'      => $oferta->getCategoria(),
        ];

        return new JsonResponse($data);
    }

    /**
     * @Route("/api/ofertas/favorito", name="agregar_favorito", methods={"POST"})
     */
    public function agregarFavorito(Request $request): JsonResponse
    {
        $data      = json_decode($request->getContent(), true);
        $jugadorId = $data['jugador_id'] ?? null;
        $ofertaId  = $data['oferta_id'] ?? null;

        if (!$jugadorId || !$ofertaId) {
            return new JsonResponse(['error' => 'Faltan datos obligatorios.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $oferta  = $this->ofertaRepository->find($ofertaId);
        $jugador = $this->jugadorRepository->find($jugadorId);
        if (!$oferta || !$jugador) {
            $msg = !$oferta ? 'Oferta no encontrada.' : 'Jugador no encontrado.';
            return new JsonResponse(['error' => $msg], JsonResponse::HTTP_NOT_FOUND);
        }

        if ($this->jugadoresOfertasRepository->findOneBy(['jugador' => $jugador, 'oferta' => $oferta])) {
            return new JsonResponse(['error' => 'Ya está en favoritos.'], JsonResponse::HTTP_CONFLICT);
        }

        $fav = (new JugadoresOfertas())
            ->setJugador($jugador)
            ->setOferta($oferta)
            ->setEsFavorito(true);

        $this->entityManager->persist($fav);
        $this->entityManager->flush();

        return new JsonResponse(['mensaje' => 'Añadido a favoritos.']);
    }

    /**
     * @Route("/api/ofertas/favorito", name="quitar_favorito", methods={"DELETE"})
     */
    public function quitarFavorito(Request $request): JsonResponse
    {
        $data      = json_decode($request->getContent(), true);
        $jugadorId = $data['jugador_id'] ?? null;
        $ofertaId  = $data['oferta_id'] ?? null;

        if (!$jugadorId || !$ofertaId) {
            return new JsonResponse(['error' => 'Faltan datos obligatorios.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $oferta  = $this->ofertaRepository->find($ofertaId);
        $jugador = $this->jugadorRepository->find($jugadorId);
        if (!$oferta || !$jugador) {
            $msg = !$oferta ? 'Oferta no encontrada.' : 'Jugador no encontrado.';
            return new JsonResponse(['error' => $msg], JsonResponse::HTTP_NOT_FOUND);
        }

        $fav = $this->jugadoresOfertasRepository->findOneBy(['jugador' => $jugador, 'oferta' => $oferta]);
        if (!$fav) {
            return new JsonResponse(['error' => 'No está en favoritos.'], JsonResponse::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($fav);
        $this->entityManager->flush();

        return new JsonResponse(['mensaje' => 'Eliminado de favoritos.']);
    }

    /**
     * @Route("/api/ofertas/club/{clubId}", name="ofertas_por_club", methods={"GET"})
     */
    public function ofertasPorClub(int $clubId): JsonResponse
    {
        $club = $this->clubRepository->find($clubId);
        if (!$club) {
            return new JsonResponse(['error' => 'Club no encontrado.'], JsonResponse::HTTP_NOT_FOUND);
        }

        $ofertas = $this->ofertaRepository->findBy(['club' => $club]);
        $data = array_map(fn(Oferta $o) => [
            'id'             => $o->getId(),
            'titulo'         => $o->getTitulo(),
            'descripcion'    => $o->getDescripcion(),
            'fecha_inicio'   => $o->getFechaInicio()->format('Y-m-d'),
            'fecha_fin'      => $o->getFechaFin()->format('Y-m-d'),
            'estado'         => $o->getEstado(),
            'fecha_creacion' => $o->getFechaCreacion()->format('Y-m-d H:i:s'),
            'categoria'      => $o->getCategoria(),
        ], $ofertas);

        return new JsonResponse($data);
    }

    /**
     * @Route("/api/ofertas/favoritos/{jugadorId}", name="favoritos_por_jugador", methods={"GET"})
     */
    public function favoritosPorJugador(int $jugadorId): JsonResponse
    {
        $jugador = $this->jugadorRepository->find($jugadorId);
        if (!$jugador) {
            return new JsonResponse(['error' => 'Jugador no encontrado.'], JsonResponse::HTTP_NOT_FOUND);
        }

        $favoritos = $this->jugadoresOfertasRepository->findBy(['jugador' => $jugador, 'esFavorito' => true]);

        $data = array_map(function (JugadoresOfertas $jo) {
            $oferta = $jo->getOferta();
            return [
                'id'             => $oferta->getId(),
                'titulo'         => $oferta->getTitulo(),
                'descripcion'    => $oferta->getDescripcion(),
                'fecha_inicio'   => $oferta->getFechaInicio()->format('Y-m-d'),
                'fecha_fin'      => $oferta->getFechaFin()->format('Y-m-d'),
                'estado'         => $oferta->getEstado(),
                'fecha_creacion' => $oferta->getFechaCreacion()->format('Y-m-d H:i:s'),
                'categoria'      => $oferta->getCategoria(),
            ];
        }, $favoritos);

        return new JsonResponse($data);
    }
}
