#!/bin/bash

# Variables
DATE=$(date +"%Y-%m-%d_%H-%M-%S") # Date formatée pour l'archivage
DB_NAME="real_estate" # Nom de ta base de données
DB_USER="postgres" # Nom d'utilisateur PostgreSQL
DB_PASS="ketsia1405" # Mot de passe PostgreSQL
BACKUP_DIR="$(pwd)/backups" # Dossier de sauvegarde dans la racine du projet

# Créer le répertoire de sauvegarde s'il n'existe pas
mkdir -p "$BACKUP_DIR"

# Exporter le mot de passe PostgreSQL
export PGPASSWORD=$DB_PASS

# Effectuer le backup dans un fichier gzip
pg_dump -U "$DB_USER" -d "$DB_NAME" | gzip > "$BACKUP_DIR/realtyco_db_backup_$DATE.sql.gz"

# Supprimer les sauvegardes de plus de 7 jours
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +7 -exec rm {} \;

echo "✔ Backup PostgreSQL terminé : $BACKUP_DIR/realtyco_db_backup_$DATE.sql.gz"
