var request=require("request");
var cheerio=require("cheerio");
var http= require("http");
var Regex = require("regex");
var mongo = require('mongodb');
var monk = require('monk');


function getJSON(database, table, url, callback) {
	var db = monk(database);
var collection = db.get(table);
		
   request(url, function (error, response, body) {
  if (!error) {
   // SCRAPPING DONNEES

   //Récupération du bloc de texte correspondant à chaque annonce qu'on met dans une case du tableau a
var a= body.match(/<div class="job-infos">([\–\+\|\/\\\_\.\?\%\,\;\&\/\-\<\>\=\"\'a-zA-Z0-9\u00E0-\u00FC\(\)^(\s*)]+)<\/div>/g);



//Recupération du titre de l'emploi:
Title= new Array();
var title;
for(var i=0;i<a.length;i++){
title =a[i].match(/>([\–\+\|\/\\\-\/\\a-zA-Z0-9\u00E0-\u00FC^(\s*)]+)<\//g)[0].replace("</","").replace(">","");
Title.push(title)
}

//Récupération du nom de l'entreprise:
Nom= new Array();
var nom;
for(var i=0;i<a.length;i++){
    nom =a[i].replace(">NEW<","").match(/>([\–\+\|\.\-\/\\a-zA-Z0-9\u00E0-\u00FC^(\s*)]+)<\//g)[3].replace("</","").replace(">","");
    Nom.push(nom);

}

//Recuperation du type du contrat:
var con, contrat;
Contrat= new Array();
for(var i=0;i<a.length;i++){
con=a[i].replace(">NEW<","").match(/>([\–\+\|\/\\\-\/\\a-zA-Z0-9\u00E0-\u00FC^(\s*)]+)<\//g)[2].replace("</","").replace(">","");
contrat=con.match(/[a-zA-Z0-9\u00E0-\u00FC]+/g).join("");
    Contrat.push(contrat);

}

//Recuperation de la ville
var ville;
Ville= new Array();
for(var i=0;i<a.length;i++){
ville=a[i].replace(">NEW<","").match(/>([\.\–\+\|\/\\\-\/\\a-zA-Z0-9\u00E0-\u00FC^(\s*)]+)<\//g)[4].replace("</","").replace(">","").replace("\n","");
if(ville.match(/\w+/)==undefined){ville="Inconnu";}
    Ville.push(ville);

}


//Récupération de la date:
var da;
var dat;
var jour;
var mois;
var annee;
var date;
Datee = new Array();
for(var i=0;i<a.length;i++){
da=a[i].match(/right([\–\+\|\/\\\_\.\?\%\,\;\&\/\-\<\>\=\"\'a-zA-Z0-9\u00E0-\u00FC^(\s*)]+)\/span/g).join("");
   // dat=da[0];
    da= da.match(/[a-zA-Z0-9\u00E0-\u00FC]+/g);
    da.shift();
    da.pop();
    jour=da[0];
    mois=da[1];
    annee=da[2];
    switch(mois){
        case "jan":mois=01;break;    
        case "fev":mois=02;break;    
        case "mar":mois=03;break;       
        case "avr":mois=04;break;    
        case "mai":mois=05;break;  
        case "juin":mois=06;break;
        case "juil":mois=07;break;
        case "aoû":mois=08;break;
        case "sept":mois=09;break;
        case "oct":mois=10;break;
        case "nov":mois=11;break;
        case "déc":mois=12;break;
    }
    date =jour+"/"+mois+"/"+annee;
    Datee.push(date);
 
}

//Récupération des Tags
var Tag=new Array();
var re = new RegExp("href", 'g');
var re2=new RegExp("data-tag-name=",'g');
var ta;
for(var i=0;i<a.length;i++){
   if(a[i].search("data-tag-name")==-1){
        ta="NoTag";
        Tag.push(ta);
        
    }else{
        ta= a[i].match(/data-tag-name=([\-\%\"\=a-zA-Z0-9\u00E0-\u00FC^(\s*)]+)href/g).join("").replace(re2,"").replace(re,"");
        ta=ta.match(/[\-\%\=a-zA-Z0-9\u00E0-\u00FC^(\s*)]+/g).join("");
        Tag.push(ta);
        
    }
}


Annonce= new Array();
for(var i=0;i<a.length;i++){
    Annonce[i]= new Array();
    
    
        Annonce[i][0]=Title[i];
        Annonce[i][1]=Nom[i];
        Annonce[i][2]=Contrat[i];
        Annonce[i][3]=Ville[i];
        Annonce[i][4]=Datee[i];
        Annonce[i][5]=Tag[i];
    
}
// construction de l'object Annnonces
function Jannonce(title, nom, contrat,ville,date,tag) {
  this.title = title;
  this.nom = nom;
  this.contrat = contrat;
  this.ville = ville;
  this.date = date;
  this.tag = tag;
    
}
var Annonces= new Object();

for(var i=0;i<a.length;i++){
	var MonAnnonce = new Jannonce(Annonce[i][0],Annonce[i][1], Annonce[i][2],Annonce[i][3],Annonce[i][4]);
	Annonces[i] = MonAnnonce;
}

// on insert l'objet dans la base de données mongo

  
  collection.insert(Annonces, function(err, records) {
		if (err) throw err; });
		
            callback(Annonces);
  }
});

          
}
		  

module.exports.getJSON=getJSON;

