# Coding Factory

## TP3 FULL STACK MEAN
### Utiliser la commande "npm run dev" pour démarrer le projet.


## Le projet


#### Partage de fonctions ou parties de codes courramment utilisés servant comme mémo rapide à récupérer.

#  

### Architecture
###### Design pattern composite.

#  

### Couches techniques Back
#### Router
###### Contient les différentes routes protégées par un Middleware d'authentification.
  
#### Controller 
###### Fait appel au service et renvoie une réponse.

#### Model 
###### Définit les schémas de données.

#  

### Couches techniques Front
#### Service
###### Envoie les appels api et permet de se logger via token et localStorage.

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

#  

## Aide à l'utilisation

- : parties
% : fonctionnalités
@ : explications

- Utilisation déconnectée
 % Accès au dashboard : visualisation en "vrac" des Files public présents sur le site 
   @ filtrable par langage
   % permet la visualisation du contenu
 % Accès au Folders : visualisation des Folders Publics sous le format d'arborescence
   @ accès en readonly (pas terminé)

- Enregistrement d'un utilisateur
 @ L'enregistrement induit la création d'un Folder "root" pour l'utilisateur, qui lui permet ensuite 
   d'accéder à son Folder à partir de Folders

- Logger un utilisateur de rôle user
   % Accès à l'onglet Account, permettant de modifier ses propres informations
     @ Tant que l'on n'a que deux rôles "user / admin" nous avons décidé de ne pas donner la possibilité
       de changer de rôle dans l'interface Account. Un admin ne peut perdre son rôle que de la part
       d'un autre admin, nous montrerons ça lors de la connexion Administrateur
   % Accès à MyFiles, permettant de voir et d'alimenter ses propres Files sur un tableau en vrac
     % action d'ajout d'un File
     % action de voir/edit/suppression sur ses propres Files
   % Accès à Folders, le système de classement personnalisé des Files, qui permet de se servir dans les Files publics des autres et 
     dans ses propres Files pour se créer son arborescence personnelle de mémos
     % accès à une vue unique des Files présents dans l'arborescence (comme pour le Dashboard)
     % accès en modification aux Files que l'on a mit ou que l'on a récupéré sur nos Folders (pas terminé, passerait par le component edit-file)
     % ajout d'un Folder au niveau d'arborescence où l'on se trouve (bouton "dossier" en haut à droite)
     % récupération d'un File au niveau d'arborescence où l'on se trouve
	@ actuellement ces deux fonctionnalités sont contraintes par un rechargement de la part de l'utilisateur, 
	  nous n'avons pas réussi à mettre l'affichage automatique du dernier ajout
	@ nous avons commencé le développement de l'arborescence avec l'utilisation d'une librairie "prismjs" paraissant très intéressante 
	  de prime abord mais qui nous a ensuite posé pas mal de problèmes d'adaptation
	  Ainsi nous nous sommes rabattu sur l'utilisation d'une solution custom sur la base de composants material
	@ edit du fichier depuis l'arborescence pas finalisé au niveau interface mais présent en url (/edit-file/:id)

- Logger un utilisateur de rôle admin
   % Mêmes accès que le rôle user
   % Accès à l'onglet Admin
      % modifier un utilisateur sans accéder à son mot de passe (confidentialité)
      % supprimer un utilisateur hors soi
        @ c'est ici que l'admin peut modifier/supprimer un autre admin, on part sur un principe de confiance entre les différents admins de l'application
	  (c'est la démocratie des admins :P)
