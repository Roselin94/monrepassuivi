# ANA MARIE PATISSERIE — menu & commandes

Application de démonstration avec menu client, espace équipe et serveur Node.js. Les commandes et les prix sont persistés sur le serveur en XAF.

## Lancer l'application

Installez Node.js 20 ou une version ultérieure, ouvrez PowerShell dans ce dossier, puis définissez les identifiants de l'espace équipe et démarrez :

```powershell
$env:ADMIN_EMAIL = "equipe@exemple.com"
$env:ADMIN_PASSWORD = "remplacez-par-un-secret-long-et-unique"
npm.cmd start
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000). Aucune dépendance externe n'est requise. En mode développement avec redémarrage automatique, utilisez `npm.cmd run dev`.

Les données sont enregistrées dans `data/app-data.json`. Pour lancer les tests du serveur, exécutez `npm.cmd test`.

## Préparer un hébergement Docker

Le `Dockerfile` produit une image Node.js qui écoute sur `0.0.0.0` et utilise `/data/app-data.json`. Sur l'hébergeur, configurez les variables secrètes `ADMIN_EMAIL` et `ADMIN_PASSWORD`, un disque persistant monté sur `/data` et le port fourni dans `PORT`. Ne mettez jamais le mot de passe dans le `Dockerfile` ni dans le dépôt. Sans disque persistant, les comptes et commandes peuvent disparaître lors d'un redémarrage ou d'un redéploiement.

Le stockage JSON convient à une seule instance. Ne lancez pas plusieurs réplicas; utilisez une base de données gérée avant de mettre l'application à l'échelle.

Pour tester le conteneur localement avec un volume persistant :

```powershell
docker build -t ana-marie-patisserie .
docker volume create ana-marie-data
docker run --rm -p 3000:3000 -v ana-marie-data:/data ana-marie-patisserie
```

Ouvrez ensuite `http://localhost:3000`. Pour imprimer des QR codes utilisables par les clients, remplacez l'adresse locale par le domaine public HTTPS de l'hébergement.

## Déploiement sur Render / TDCloud / Vercel

### Option recommandée : backend Node sur Render ou TDCloud, front statique sur Vercel

- Le backend de l'application est le serveur Node (`server.js`) qui porte l'API REST et les sessions.
- La base de données recommandée est PostgreSQL. Le projet accepte la variable `DATABASE_URL` et le code de persistance du backend reste compatible avec un stockage JSON si la base n'est pas configurée.
- Pour le front, la meilleure solution est de publier le site statique sur Vercel et la logique applicative sur Render ou TDCloud.

Variables à mettre en production :

```env
PORT=3000
HOST=0.0.0.0
ADMIN_EMAIL=equipe@exemple.com
ADMIN_PASSWORD=un-mot-de-passe-assez-long-et-unique
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB_NAME
```

### Render

1. Créez un service Web Node.js.
2. Branchez le dépôt Git.
3. Définissez la commande de démarrage : `npm install && npm start`.
4. Ajoutez les variables d'environnement ci-dessus.
5. Ajoutez un service PostgreSQL dans Render si nécessaire.
6. Référez le domaine final dans votre configuration.

Un fichier `render.yaml` est fourni à la racine du projet pour faciliter le déploiement.

### TDCloud

1. Créez un conteneur ou un service Node basé sur le `Dockerfile` fourni.
2. Montez un volume pour `/data` si vous souhaitez conserver le stockage JSON local.
3. Ajoutez les mêmes variables secrètes (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `DATABASE_URL`).
4. Exposez le port `3000` et ajoutez le domaine public lié au service.

### Vercel

Le dépôt peut aussi être préparé pour un frontend statique sur Vercel, mais la logique métier et les sessions doivent être hébergées côté backend sur Render ou TDCloud.

- Le front static est servi par Vercel.
- L'API doit pointer vers le backend externalisé (`https://votre-backend.render.com` ou un domaine TDCloud).
- Si vous souhaitez garder une seule application complète, choisissez plutôt Render ou TDCloud.

Le fichier `vercel.json` est fourni pour la partie front. Configurez ensuite l'URL de votre backend dans la configuration de l'interface si vous séparez front et API, par exemple :

```html
<script>
  window.__APP_API_BASE__ = "https://votre-backend.render.com";
</script>
```

### Base de données

- Le mode local et les démos restent compatibles avec le stockage JSON.
- En production, PostgreSQL est la recommandation pour les comptes clients, les sessions, les produits, les commandes et la persistance des tables.
- La variable `DATABASE_URL` doit être ajoutée sur Render / TDCloud et sur tout environnement d'hébergement qui a besoin de persistance durable.

## API

- `GET /api/health` et `GET /api/bootstrap`
- `POST /api/admin/login`, `POST /api/admin/logout`
- `GET /api/admin/session` et `GET /api/admin/bootstrap` (session équipe requise)
- `POST /api/customer/register`, `POST /api/customer/login`, `POST /api/customer/logout`
- `GET /api/customer/session` et `GET /api/customer/orders`
- `POST /api/orders` et `PATCH /api/orders/:id/status`
- `POST /api/products`, `PATCH /api/products/:id` et `PATCH /api/products/:id/availability`
- `PATCH /api/settings` et `PATCH /api/tables/:number`
- `POST /api/demo/reset`

Les prix sont des entiers en XAF. Le serveur fixe lui-même les prix à la création des commandes et vérifie que les produits sont encore disponibles.

## Limites de cette démonstration

Le démarrage local écoute uniquement sur l'ordinateur local par défaut. Les API de gestion exigent une session équipe; les clients doivent se connecter pour commander et ne voient que leurs propres commandes. Les mots de passe sont hachés et les sessions utilisent un cookie HTTP-only. Le stockage JSON n'est pas une base de données de production et il n'y a pas de sauvegardes ni de paiement en ligne. Configurez les secrets et le disque persistant avant l'hébergement; prévoyez une base de données et des sauvegardes avant d'augmenter la charge.
