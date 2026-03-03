# Test_technique_Clementine

## Comment démarrer le projet ?
### Docker

Ici, Docker va servir à gérer la DB et à ne pas avoir à lancer de logiciel tierce. 

Une fois que votre docker en local sera démarrer, vous pourrez executer le docker compose
```bash
docker compose up -d
```

### Backend 

Une fois le projet ouvert, acceder à la partie backend
```bash
cd backend
```

Puis installer les dépendances
```bash
npm install
```

Enfin démarrer la partie serveur
```bash
npm run start:dev
```

### Frontend
Une fois le projet ouvert, acceder à la partie frontend
```bash
cd frontend
```

Puis installer les dépendances
```bash
npm install
```

Enfin démarrer la partie interface
```bash
npm run dev
```
## Techno utilisées

Node (NestJS), Vue3, Docker

## Utilisation locale
### Création utilisateur

Pour créer des utilisateurs, vous pourrez faire un appel au endpoint `localhost:8081/api/users` en POST avec ce JSON 
```JSON

```