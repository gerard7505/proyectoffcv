<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity]
#[ORM\Table(name: "clubs")]
class Club implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\Column(type: "string", length: 100)]
    private string $name;

    #[ORM\Column(type: "string", length: 100, unique: true)]
    private string $email;

    #[ORM\Column(type: "string", length: 100)]
    private string $city;

    #[ORM\Column(type: "string", length: 255)]
    private string $password;

    #[ORM\OneToMany(mappedBy: "club", targetEntity: Oferta::class, orphanRemoval: true, cascade: ["persist"])]
    private Collection $ofertas;

    public function __construct()
    {
        $this->ofertas = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;
        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function getRoles(): array
    {
        return ['ROLE_USER']; 
    }

    public function eraseCredentials(): void {}

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    /**
     * @return Collection<int, Oferta>
     */
    public function getOfertas(): Collection
    {
        return $this->ofertas;
    }

    public function addOferta(Oferta $oferta): self
    {
        if (!$this->ofertas->contains($oferta)) {
            $this->ofertas[] = $oferta;
            $oferta->setClub($this);
        }
        return $this;
    }

    public function removeOferta(Oferta $oferta): self
    {
        if ($this->ofertas->removeElement($oferta)) {
            if ($oferta->getClub() === $this) {
                $oferta->setClub(null);
            }
        }
        return $this;
    }
}
