# airneis

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
