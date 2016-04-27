import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Jardin} from "intefaces";



@Injectable()
export class JardinService {
    constructor (private http: Http) {}
    private _jardinUrl = 'assets/json/jardin.json';

    jardin:Jardin;

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
