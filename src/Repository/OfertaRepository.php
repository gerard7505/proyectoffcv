<?php

namespace App\Repository;

use App\Entity\Oferta;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Oferta>
 */
class OfertaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Oferta::class);
    }

    /**
     * Buscar todas las ofertas de un club específico
     */
    public function findByClubId(int $clubId): array
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.club = :clubId')
            ->setParameter('clubId', $clubId)
            ->orderBy('o.fechaCreacion', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Buscar todas las ofertas aceptadas
     */
    public function findAceptadas(): array
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.estado = :estado')
            ->setParameter('estado', 'aceptada')
            ->orderBy('o.fechaInicio', 'ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Buscar ofertas pendientes para revisión del admin
     */
    public function findPendientes(): array
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.estado = :estado')
            ->setParameter('estado', 'pendiente')
            ->orderBy('o.fechaCreacion', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
