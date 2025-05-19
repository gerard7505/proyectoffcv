<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250409062628 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE oferta DROP FOREIGN KEY fk_oferta_club
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE oferta CHANGE descripcion descripcion LONGTEXT NOT NULL, CHANGE estado estado VARCHAR(20) NOT NULL, CHANGE fecha_creacion fecha_creacion DATETIME NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE oferta ADD CONSTRAINT FK_7479C8F261190A32 FOREIGN KEY (club_id) REFERENCES clubs (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE oferta RENAME INDEX fk_oferta_club TO IDX_7479C8F261190A32
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE oferta DROP FOREIGN KEY FK_7479C8F261190A32
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE oferta CHANGE descripcion descripcion TEXT NOT NULL, CHANGE estado estado VARCHAR(20) DEFAULT 'pendiente' NOT NULL, CHANGE fecha_creacion fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE oferta ADD CONSTRAINT fk_oferta_club FOREIGN KEY (club_id) REFERENCES clubs (id) ON UPDATE NO ACTION ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE oferta RENAME INDEX idx_7479c8f261190a32 TO fk_oferta_club
        SQL);
    }
}
