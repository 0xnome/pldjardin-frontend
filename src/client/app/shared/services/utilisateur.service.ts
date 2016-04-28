import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http} from 'angular2/http';
import {UtilService, Utilisateur, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class UtilisateurService {
    constructor (private http: Http, private authHttp:AuthHttp) {}
    private _utilisateurUrl = Config.api + '/utilisateurs/';
    
    getUtilisateur(id:number):Observable<Utilisateur> {
        return this.authHttp.get(this._utilisateurUrl+id+'/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }
    
    getList():Observable<Utilisateur> {
    return this.http.get(this._utilisateurUrl, {headers:UtilService.getHeaders()})
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }
}
