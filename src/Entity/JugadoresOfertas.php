<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Oferta;
use App\Entity\Jugador;

#[ORM\Entity(repositoryClass: "App\Repository\JugadoresOfertasRepository")]
#[ORM\Table(name: "jugadores_ofertas")]
class JugadoresOfertas
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Oferta::class)]
    #[ORM\JoinColumn(nullable: false)]
    private Oferta $oferta;

    #[ORM\ManyToOne(targetEntity: Jugador::class)]
    #[ORM\JoinColumn(nullable: false)]
    private Jugador $jugador;

    #[ORM\Column(type: "boolean")]
    private bool $esFavorito = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOferta(): Oferta
    {
        return $this->oferta;
    }

    public function setOferta(Oferta $oferta): self
    {
        $this->oferta = $oferta;
        return $this;
    }

    public function getJugador(): Jugador
    {
        return $this->jugador;
    }

    public function setJugador(Jugador $jugador): self
    {
        $this->jugador = $jugador;
        return $this;
    }

    public function getEsFavorito(): bool
    {
        return $this->esFavorito;
    }

    public function setEsFavorito(bool $esFavorito): self
    {
        $this->esFavorito = $esFavorito;
        return $this;
    }
}
