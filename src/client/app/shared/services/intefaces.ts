
export interface Adresse {
    id: number,
    ville:string,
    code_postal: string,
    rue: string,
    long: string,
    lat: string
}

export interface Jardin {
    id: number;
    nom: string;
    horaire: string;
    image: string;
    description: string;
    restreint:boolean;
    adresse:Adresse
}

export interface Actualite {
  id: number;
  jardin: number;
  texte: string;
  date_creation: string;
}
