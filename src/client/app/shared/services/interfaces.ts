
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
    site: string;
    horaire: string;
    image: string;
    description: string;
    restreint:boolean;
    compostier:boolean;
    adresse:number[];
    administrateurs:number[]
    membres:number[]
}
