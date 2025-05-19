<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250409064022 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE jugadores_ofertas (jugador_id INT NOT NULL, oferta_id INT NOT NULL, INDEX IDX_7075B003B8A54D43 (jugador_id), INDEX IDX_7075B003FAFBF624 (oferta_id), PRIMARY KEY(jugador_id, oferta_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE jugadores_ofertas ADD CONSTRAINT FK_7075B003B8A54D43 FOREIGN KEY (jugador_id) REFERENCES jugador (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE jugadores_ofertas ADD CONSTRAINT FK_7075B003FAFBF624 FOREIGN KEY (oferta_id) REFERENCES oferta (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE oferta RENAME INDEX fk_7479c8f261190a32 TO IDX_7479C8F261190A32
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE jugadores_ofertas DROP FOREIGN KEY FK_7075B003B8A54D43
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE jugadores_ofertas DROP FOREIGN KEY FK_7075B003FAFBF624
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE jugadores_ofertas
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE oferta RENAME INDEX idx_7479c8f261190a32 TO FK_7479C8F261190A32
        SQL);
    }
}
