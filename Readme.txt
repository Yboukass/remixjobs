Bonjour,

Veuillez trouver ci joint les fichiers de notre projet api RemixJob.

------------Configuration prealables-------------------

1)Creer un dossier et y mettre les 2 fichiers
2)Creer � l'interieur de ce dossier un dossier data 
3)Connecter le serveur MongoDB � ce dernier dossier 
  mongod --dbpath REPERTOIRE/DOSSIER/data
4)Ouvrir la console mongo:
  mongo
  use DOSSIER
5)Ouvrir app.js avec un editeur:
A la ligne 19
  Personnalisez l'appel � la fonction du module api:
     Modifier le premier parametre en rempla�ant nodetest2 par votre DOSSIER
     Enregistrer
6)Depuis la console node dans le bon repertoire:
  npm start 
  node app.js (au choix)

7)On v�rifie depuis la console mongo que les informations ont bien ete stockees:
use annonces
db.annonces.find()

-----------------Commentaires---------------------------

Notre api se presente sous la forme d'un module qui contient une fonction (GetJSON).
On appel notre fonction en lui passant les parametre de notre base de donn�es et le lien 
de la page � scrapper.

Notre module scrappe les informations de la page d'acceuil du site, et uniquement de cette page
(lorsque nous avons essayer de scrapper une annonce en particulier nous avons re�u le message 
"You are a bad robot"). On rempli notre base de donn�es avec ces informations, notre fonction
donne aussi acc�s � ces informations via la callback.

Nous aurions pu lancer une requete sur le site RemixJobs (une recherche) en pla�ant un mot cl�
en parametre plutot que l'url du site mais nous avons �t� press� par le temps.

Ce tp nous a permis de comprendre la notion d'API Restful avec un serveur ou sont stock�es
les donn�es dans une base propre � l'API.
Nous avons �galement pu approfondir nos connaissance du serveur NODE. 

Nous vous remercions pour nous avoir accord� un  d�lai suppl�mentaire qui nous a permis d'avancer
significativement sur ce projet.

Cordialement

BOUKASSEM Yassine et BEN MOHAMED Sofiane