# airneis

## Installation

### Prérequis

- [Node.js](https://nodejs.org/en/download/)

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

### Démarrer le serveur

```bash
# Web
npm run web

# iOS (macOS uniquement)
npm run mobile:ios

# Android
npm run mobile:android
```
