import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http} from 'angular2/http';
import {UtilService, Utilisateur, Jardin, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class UtilisateurService {
    constructor (private http: Http, private authHttp:AuthHttp) {}
    private _utilisateurUrl = Config.api + '/utilisateurs/';

    getMe():Observable<Utilisateur> {
        return this.authHttp.get(this._utilisateurUrl+'moi/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    getUtilisateur(id:number):Observable<Utilisateur> {
        return this.authHttp.get(this._utilisateurUrl+id+'/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    getJardinsUtilisateur(id:number):Observable<Jardin[]> {
    return this.authHttp.get(this._utilisateurUrl+id+'/membre_jardins/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
                .catch(UtilService.handleError)
     }
    
     getList():Observable< Utilisateur> {
    return this.http.get(this._utilisateurUrl, {headers:UtilService.getHeaders()})
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }
}
