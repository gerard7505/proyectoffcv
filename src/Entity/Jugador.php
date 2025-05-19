<?php
// src/Entity/Jugador.php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert; 
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;  

#[ORM\Entity(repositoryClass: \App\Repository\JugadorRepository::class)]
class Jugador implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 100)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 100)]
    private ?string $name = null;

    #[ORM\Column(type: 'string', length: 100)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 100)]
    private ?string $lastName = null;

    #[ORM\Column(type: 'string', length: 100, unique: true)]
    #[Assert\Email]
    #[Assert\NotBlank]
    private ?string $email = null;

    #[ORM\Column(type: 'string', length: 9, unique: true)]
    #[Assert\NotBlank]
    #[Assert\Regex(pattern: "/^[0-9]{8}[A-Za-z]$/", message: "El DNI no es válido.")]
    private ?string $dni = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private ?string $address = null;

    #[ORM\Column(type: 'string', length: 100)]
    #[Assert\NotBlank]
    private ?string $city = null;

    #[ORM\Column(type: 'date')]
    #[Assert\NotBlank]
    private ?\DateTimeInterface $dateOfBirth = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private ?string $password = null; 

    #[ORM\ManyToMany(targetEntity: Oferta::class, inversedBy: "jugadores")]
    #[ORM\JoinTable(name: "jugadores_ofertas")]
    private Collection $ofertas;

    public function __construct()
    {
        $this->ofertas = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getDni(): ?string
    {
        return $this->dni;
    }

    public function setDni(string $dni): self
    {
        $this->dni = $dni;
        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;
        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;
        return $this;
    }

    public function getDateOfBirth(): ?\DateTimeInterface
    {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth(\DateTimeInterface $dateOfBirth): self
    {
        $this->dateOfBirth = $dateOfBirth;
        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getRoles(): array
    {
  
        return ['ROLE_USER']; 
    }

    public function eraseCredentials(): void
    {
     
    }

    public function getOfertas(): Collection
    {
        return $this->ofertas;
    }

    public function addOferta(Oferta $oferta): self
    {
        if (!$this->ofertas->contains($oferta)) {
            $this->ofertas[] = $oferta;
        }
        return $this;
    }

    public function removeOferta(Oferta $oferta): self
    {
        $this->ofertas->removeElement($oferta);
        return $this;
    }
}
