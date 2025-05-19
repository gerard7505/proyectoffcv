<?php

namespace App\Repository;

use App\Entity\JugadoresOfertas;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class JugadoresOfertasRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, JugadoresOfertas::class);
    }

    
}
