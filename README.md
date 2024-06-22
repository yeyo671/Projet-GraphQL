# Projet : TP Final GraphQL

## Equipe
Ce projet a été réalisé par :

- Léo TRAN
- Eliot MEURILLON
- Ulysse GUILLOT
- Philippe BONNAFOUS

## Description du projet

Le but de cet exercice est de créer un réseau social où les utilisateurs peuvent s'inscrire, publier des articles, commenter les publications d'autres utilisateurs, et "liker" des articles.
Ce projet mettra en pratique l'utilisation des queries, mutations, et l'intégration avec Prisma pour la gestion de la base de données tout en implémentant la partie Frontend de votre produit.


## Installation

- [Node.js](https://nodejs.org/) (version 14.x ou supérieure)
- [npm](https://www.npmjs.com/)
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli/installation)

### Backend

1. Naviguez dans le répertoire `back` :

    ```bash
    cd back
    ```
    
2. Installez les dépendances :

    ```bash
    npm i
    ```

3. Configurez la base de données avec Prisma :

    ```bash
    npx prisma migrate deploy
    ```
    
4. Démarrez le serveur :
    ```bash
    npm run start
    ```

5. Ouvrir un navigateur et accedez à l'adresse
    ```bash
   http://localhost:5173/
    ```


### Frontend

1. Naviguez dans le répertoire `front` :

    ```bash
    cd front
    ```
    
2. Installez les dépendances :
    ```bash
    npm i
    ```

3. Démarrez le serveur :
    ```bash
    npm run build
    ```
    
4. Ouvrir un navigateur et accedez à l'adresse
    ```bash
   http://localhost:4000/
    ```







