import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';

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

@Injectable()
export class JardinService {
    constructor (private http: Http) {}
    private _jardinUrl = 'assets/json/jardin.json';

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

    getJardin(id:number):Observable<Jardin> {
        return this.http.get(this._jardinUrl)
            .map(JardinService.extractData)
            .catch(JardinService.handleError)
    }

    private static extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || { };
    }

    private static handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
