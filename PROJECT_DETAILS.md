# LuminaZen Marketplace - Fullstack

Une application de petites annonces premium inspirée de Kijiji, construite avec Vite, Tailwind CSS 4, Capacitor et un backend Node.js robuste.

## Architecture

- **Frontend** : Vite, Tailwind CSS 4, Capacitor (Android).
- **Backend** : Node.js, Express, Prisma, SQLite.
- **Real-time** : Socket.io pour la messagerie instantanée.

## Fonctionnalités

- **Navigation SPA** : Transitions fluides entre les pages.
- **Dépôt d'Annonces** : Intégration de la Camera native et de la Géolocalisation.
- **Messagerie** : Chat en temps réel entre utilisateurs.
- **Design Premium** : Glassmorphism, animations fluides et thèmes Material Design 3.

## Installation

1. **Serveur** : `cd server && npm install && npx prisma migrate dev`
2. **Client** : `cd client && npm install`
3. **Run Dev** :
   - Serveur : `npm run dev` (dans /server)
   - Client : `npm run dev` (dans /client)

## CI/CD

Le projet utilise GitHub Actions pour compiler automatiquement l'APK à chaque push sur la branche principale.
