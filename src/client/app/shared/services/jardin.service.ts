import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http} from 'angular2/http';
import {UtilService, Jardin, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Utilisateur, Adresse} from "./interfaces";

@Injectable()
export class JardinService {
    constructor (private http: Http, private authHttp:AuthHttp) {}
    private _jardinsUrl = Config.api + '/jardins/';

    getJardin(id:number):Observable<Jardin> {
        return this.authHttp.get(this._jardinsUrl+id+'/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    getAdresseJardin(id:number):Observable<Adresse> {
        return this.authHttp.get(this._jardinsUrl+id+'/adresse', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    getList():Observable<Jardin[]> {
    return this.http.get(this._jardinsUrl, {headers:UtilService.getHeaders()})
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }

    getUtilisateurs(id:number):Observable<Utilisateur[]> {
        return this.http.get(this._jardinsUrl + id+'/membres/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }
}
