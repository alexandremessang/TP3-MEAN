# Coding Factory

## TP3 FULL STACK MEAN
### Utiliser la commande "npm run dev" pour démarrer le projet.


## Le projet

### Partage de fonctions ou parties de codes courramment utilisés servant comme mémo rapide à récupérer.


# ------------------

### Couches techniques  

#### Router
###### Contient les différentes routes protégées par un Middleware d'authentification.
  
#### Controller 
###### Fait appel au service et renvoie une réponse.

#### Service
###### Envoie les appels api et permet de se logger via token et localStorage.

#### Model 
###### Définit les schémas de données.

#### Component
##### Folder 
###### Possède un Folder parent (peut être lui même) ainsi que des enfants Folder et File.

##### File 
###### Est contenu dans un Folder et fait appel au package Highlight.js.

##### User
###### Possède un répertoire root pour y ajouter des fichiers et gérer son arborescence de répertoires/fichiers.

##### UserGroup (Future feature)
###### Groupe contenant un Owner (User admin du groupe) ayant les droits sur les autres membres du groupe. Le groupe possède une arborescence de fichiers/répertoires propre à lui même et visible et éditable par les membres du groupe.
#  
### Authentification
###### Route login qui renvoie vers le controller 'login', lance la fonction login qui va récupérer l'email en base. Si trouvé il recherche le mot de passe et le compare avec celui en DB. Puis renvoie le model User en JWT si la comparaison est bonne sinon renvoie un toast d'invalidité. Il est ensuite inséré dans le localStorage.

