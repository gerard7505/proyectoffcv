<?php
namespace App\Entity;

use App\Repository\OfertaRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Club;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;  

#[ORM\Entity(repositoryClass: OfertaRepository::class)]
#[ORM\Table(name: "oferta")]
class Oferta
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Club::class, inversedBy: "ofertas")]
    #[ORM\JoinColumn(name: "club_id", referencedColumnName: "id", nullable: false)]
    private ?Club $club = null;

    #[ORM\Column(type: "string", length: 255)]
    private string $titulo;

    #[ORM\Column(type: "text")]
    private string $descripcion;

    #[ORM\Column(type: "date")]
    private \DateTimeInterface $fechaInicio;

    #[ORM\Column(type: "date")]
    private \DateTimeInterface $fechaFin;

    #[ORM\Column(type: "string", length: 20)]
    private string $estado = 'pendiente';

    #[ORM\Column(type: "datetime")]
    private \DateTimeInterface $fechaCreacion;

    #[ORM\Column(type: "string", length: 50)]  
    private string $categoria;

 
    #[ORM\ManyToMany(targetEntity: Jugador::class, mappedBy: "ofertas")]
    private Collection $jugadores;

    public function __construct()
    {
        $this->fechaCreacion = new \DateTime();
        $this->estado = 'pendiente';
        $this->jugadores = new ArrayCollection();  
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClub(): ?Club
    {
        return $this->club;
    }

    public function setClub(?Club $club): self
    {
        $this->club = $club;
        return $this;
    }

    public function getTitulo(): string
    {
        return $this->titulo;
    }

    public function setTitulo(string $titulo): self
    {
        $this->titulo = $titulo;
        return $this;
    }

    public function getDescripcion(): string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): self
    {
        $this->descripcion = $descripcion;
        return $this;
    }

    public function getFechaInicio(): \DateTimeInterface
    {
        return $this->fechaInicio;
    }

    public function setFechaInicio(\DateTimeInterface $fechaInicio): self
    {
        $this->fechaInicio = $fechaInicio;
        return $this;
    }

    public function getFechaFin(): \DateTimeInterface
    {
        return $this->fechaFin;
    }

    public function setFechaFin(\DateTimeInterface $fechaFin): self
    {
        $this->fechaFin = $fechaFin;
        return $this;
    }

    public function getEstado(): string
    {
        return $this->estado;
    }

    public function setEstado(string $estado): self
    {
        $estadosValidos = ['pendiente', 'aceptada', 'rechazada'];
        if (in_array($estado, $estadosValidos)) {
            $this->estado = $estado;
        }
        return $this;
    }

    public function getFechaCreacion(): \DateTimeInterface
    {
        return $this->fechaCreacion;
    }

    public function setFechaCreacion(\DateTimeInterface $fechaCreacion): self
    {
        $this->fechaCreacion = $fechaCreacion;
        return $this;
    }


    public function getJugadores(): Collection
    {
        return $this->jugadores;
    }

    public function addJugador(Jugador $jugador): self
    {
        if (!$this->jugadores->contains($jugador)) {
            $this->jugadores[] = $jugador;
            $jugador->addOferta($this); 
        }
        return $this;
    }

    public function removeJugador(Jugador $jugador): self
    {
        if ($this->jugadores->removeElement($jugador)) {
            $jugador->removeOferta($this); 
        }
        return $this;
    }

    public function getCategoria(): string
    {
        return $this->categoria;
    }

    public function setCategoria(string $categoria): self
    {
        $this->categoria = $categoria;
        return $this;
    }
}
