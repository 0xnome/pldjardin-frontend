export interface Adresse {
    id:number;
    ville:string;
    code_postal:string;
    rue:string;
    long:string;
    lat:string
}

export interface Action {
    type:string,
    utilisateur:number;
    plante:number;
    date_creation:string;
}

export interface Jardin {
    id:number;
    nom:string;
    site:string;
    horaire:string;
    contact:string;
    image:string;
    description:string;
    restreint:boolean;
    composteur:boolean;
    adresse:number;
    administrateurs:number[];
    membres:number[];
    actualites:number[];
    lopins:number[];
    commentaires:number[];
}

export interface Actualite {
    id:number;
    jardin:number;
    texte:string;
    date_creation:string;
    auteur:number;
}

export interface Lopin {
    id:number;
    adresse:number;
    jardin:number;
    nom:string;
    description:string;
}

export interface Plante {
    id:number;
    lopin:number;
    image:string;
    nom:string;
    description:string;
    espece:string;
}

export interface Utilisateur {
    id:number;
    username:string;
    first_name:string;
    last_name:string;
    email:string;
    profil:{
        id:number;
        ville:string;
        presentation:string;
        avatar:string;
    }
}

export interface ReponseRecherche {
    jardins:Jardin[];
    lopins:Lopin[];
    plantes:Plante[];
}


export interface Commentaire {
  id:number;
  texte:string;
  date_creation:string;
  auteur:number;
}

export interface CommentaireJardin extends Commentaire {
    jardin:number ;
}

export interface CommentairePlante extends Commentaire {
    plante:number ;
}

export interface CommentaireLopin extends Commentaire {
    lopin:number ;
}
