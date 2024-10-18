# Sticky Note App

## Description

La **Sticky Note App** est une application web interactive permettant aux utilisateurs de créer, organiser, modifier et supprimer des notes de manière intuitive. Conçue pour être rapide, simple et sécurisée, cette application s’appuie sur une architecture complète avec un backend robuste et un frontend réactif, le tout optimisé pour une gestion efficace des données.

### Fonctionnalités principales :

- **Création de notes** : Ajoutez de nouvelles notes rapidement avec du contenu par défaut pour une prise en main rapide.
- **Déplacement de notes** : Faites glisser et déposez les notes à l'emplacement de votre choix pour une organisation personnalisée selon vos besoins.
- **Modification en temps réel** : Modifiez le contenu de vos notes avec une sauvegarde automatique des changements pour un flux de travail fluide.
- **Suppression de notes** : Supprimez les notes non désirées en un clic, simplifiant ainsi la gestion des informations.
- **Gestion de l'authentification** : Protégez l'accès à vos notes avec une authentification sécurisée, garantissant que seules les personnes autorisées peuvent accéder à leur contenu.

## Stack Technique

### Backend

- **Node.js** : Le runtime JavaScript utilisé pour exécuter le backend, offrant une architecture asynchrone pour gérer efficacement les requêtes utilisateur.
- **Express.js** : Framework minimaliste pour Node.js, permettant la création rapide d'API RESTful, incluant les routes pour la gestion des notes et l'authentification.
- **MongoDB** : Base de données NoSQL utilisée pour stocker les notes des utilisateurs et les informations d'authentification, offrant une grande flexibilité et évolutivité.

### Frontend

- **React.js** : Librairie JavaScript utilisée pour créer l'interface utilisateur dynamique, offrant une expérience réactive et performante.
- **Axios** : Client HTTP utilisé pour effectuer les requêtes vers le backend, permettant de gérer les données en temps réel via des appels API.
- **Tailwind CSS** : Framework CSS utilisé pour le style de l'application, offrant une personnalisation rapide et efficace avec des classes utilitaires.

## Installation

### Prérequis

- Node.js (v14 ou plus récent)
- MongoDB installé et configuré
- Un gestionnaire de paquets comme npm ou yarn

### Backend

1. Clonez ce dépôt :

```bash
   git clone https://github.com/gery-guedegbe/Stricky-Note-App.git
```

2. Accédez au répertoire backend :

```bash
   cd sticky-note-app/backend
```

3. Installez les dépendances :

```bash
   npm install
```

4. Configurez les variables d'environnement dans un fichier .env (voir le fichier .env.example pour les variables nécessaires) :

```bash
   MONGO_URI=your-mongo-uri
   JWT_SECRET=your-secret
```

5. Lancez le serveur :

```bash
   npm start
```

### Frontend

1. Accédez au répertoire frontend :

```bash
   cd ../frontend
```

2. Installez les dépendances :

```bash
   npm install
```

3. Lancez l'application React :

```bash
   npm start
```

4. Lancez l'application React :

```bash
   http://localhost:5173
```

### Utilisation

1. Créez un compte ou connectez-vous via l'interface d'authentification.
2. Ajoutez des notes via le bouton Ajouter une note.
3. Faites glisser les notes sur l'écran pour les organiser selon vos préférences.
4. Cliquez sur une note pour modifier son contenu et l'enregistrer automatiquement.
5. Supprimez les notes que vous n'avez plus besoin de garder.

### API Endpoints

## Notes

- POST /api/notes : Créer une nouvelle note
- GET /api/notes : Récupérer toutes les notes de l'utilisateur
- PATCH /api/notes/:id : Mettre à jour une note
- DELETE /api/notes/:id : Supprimer une note

### Authentification

- POST /api/auth/register : Inscription d'un utilisateur
- POST /api/auth/login : Connexion de l'utilisateur

### Améliorations Futures

- Ajouter des catégories pour les notes.
- Implémenter la synchronisation en temps réel avec Socket.io.
- Améliorer l'accessibilité de l'interface utilisateur

### Contributeurs

- Géry Guedegbe : Développeur Fullstack - Créateur et mainteneur du projet.
