# ChristopheRomand_7_28012022

## OpenClassRooms Formation Développeur Web

##### Technologie :

![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

##### Environnement :

![Arch](https://img.shields.io/badge/Arch%20Linux-1793D1?logo=arch-linux&logoColor=fff&style=for-the-badge)
![Manjaro](https://img.shields.io/badge/Manjaro-35BF5C?style=for-the-badge&logo=Manjaro&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Projet numéro 7 "Créez un réseau social d'entreprise"

![groupomania](https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png)

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

#### Périmètre

---

- la présentation des fonctionnalités doit être simple.
- la création d’un compte doit être simple et possible depuis un téléphone mobile.
- le profil doit contenir très peu d’informations pour que sa complétion soit rapide.
- la suppression du compte doit être possible.
- l’accès à un forum où les salariés publient des contenus multimédias doit être présent.
- l’accès à un forum où les salariés publient des textes doit être présent.
- les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés.
- le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre
  salariés.

# installation

### back-end :

Le fichier ".env.example" situé dans le dossier backend donne accès à la base de données et autres variables serveur, pour l'activer il faut supprimer l'extension .example (.env.example => .env)

Il faut ensuite le modifier en ajoutant vos informations de connexion à la base de données :

```bash
DB_USERNAME = root
DB_PASSWORD = Votre_mot_de_passe_sql
DB_DATABASE = Nom_de_votre_choix
DB_HOST = localhost
```

Ensuite se rendre avec la console dans le dossier backend

```
npm install
```

```
nodemon server
```

Le server se lance sur http://localhost:3000/

### front-end :

Se rendre avec la console dans le dossier frontend

```
npm install
```

```
npm run serve
```

Le server se lance sur http://localhost:8080/

## Installation Database :

#### Créer la base de données et faire les migrations :

Un dossier migration vous permettra de créez les tables directement, aller avec la console à la racine du dossier backend :

```bash
  npx sequelize-cli db:create
  npx sequelize-cli db:migrate
  nodemon server
```

## Administration :

Pour créer un administrateur avec les droits élevés, il faut l'intégrer manuellement dans la base de données avec [Postman](https://www.postman.com/)

Requête POST à cette adresse http://localhost:3000/api/auth/signup
Méthode Body - raw

    "email": "admin@admin.com",
    "username": "admin",
    "password": "passwordAdmin",

Ensuite en ligne de commande ou avec [MySql-Workbench](https://www.mysql.com/products/workbench/) passer à cet utilisateur la colone de "isAdmin=O" à "isAdmin=1".
