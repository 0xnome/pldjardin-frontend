interface Adresse {
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

export class JardinService {
    jardin:Jardin = {
        id: 1,
        nom: "Mon jardin a moi",
        horaire: "Tous les jours de 8h à 8h05",
        image: "http://www.lechouettejardin.com/lechouettejardin.com/-_files/Logo_1.jpg",
        description: "C'est mon jardin c'est le plus beau",
        restreint: true,
        adresse: {
            id: 1,
            ville: "Villeurbanne",
            code_postal: "69100",
            rue: "Rue JeanLucDeLa",
            long: "0.000000",
            lat: "0.000000"
        }
    };

    get():Jardin {
        return this.jardin;
    }
}
