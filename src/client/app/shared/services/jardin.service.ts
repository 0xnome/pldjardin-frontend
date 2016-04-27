import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {UtilService, Jardin} from "../../shared/index";

@Injectable()
export class JardinService {
    constructor (private http: Http) {}
    private _jardinsUrl = 'http://localhost:8000/jardins/';

    jardin:Jardin;

    getJardin(id:number):Observable<Jardin> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'JWT '+ localStorage.getItem('id_token'));

        return this.http.get(this._jardinsUrl+id+'/', {headers:headers})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    getList():Observable<Jardin> {
    return this.http.get(this._jardinsUrl)
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }
}
