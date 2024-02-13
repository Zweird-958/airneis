# airneis

### Contributeurs

- [Notion](https://www.notion.so/5032283075074531a905ae196c0db0f8?v=27b4acb3b75d4338affe8306150984a3&pvs=4)

- Julien HAMEL (Zweird-958) <julienhamel.h@gmail.com>
- Léon CARIOU (theghost013) <cariouleon@gmail.com>
- Bruno GOMES PEIXOTO (SeRiice) <bruno.gomespeixoto1@gmail.com>
- Vitor GOMES DE SOUSA (rd-xx) <vitor.gdsousa28@gmail.com>

## Installation

### Prérequis

- [Docker](https://docs.docker.com/install/)
- [Node.js v20.9.0](https://nodejs.org/dist/v20.9.0/)

### Initialisation

```bash
# Installer les dépendences
npm i

# Populer les variables d'environnement
# Un `.env.example` a été mis à disposition à la racine du projet
cp .env.example .env

# Lier les fichiers d'environnement aux apps
npm run env-symlink
```

## Développement

### Démarer les services Docker

```bash
docker compose up
```

### Démarrer le serveur

```bash
# Web
npm run web

# iOS (macOS uniquement)
npm run mobile:ios

# Android
npm run mobile:android
```

### Base de données

```bash

# Éxecuter les migrations
npm run db:migrate

# Annuler les migrations
npm run db:migrate:down

# Créer une migration
npm run db:migrate:make <migration_name>

# Exécuter les seeds
npm run db:seed

# Créer un seed
npm run db:seed:make <seed_name>

```
