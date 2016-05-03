import {Observable}     from 'rxjs/Observable';
import {Injectable, Component}     from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {AuthService, UtilService, Utilisateur, Jardin, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class UtilisateurService {
    constructor (private http: Http, private authHttp:AuthHttp, private authService:AuthService) {}
    private _utilisateurUrl = Config.api + '/utilisateurs/';

    getMe():Observable<Utilisateur> {
        return this.authHttp.get(this._utilisateurUrl+'moi/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    getUtilisateur(id:number):Observable<Utilisateur> {
      if(this.authService.getId() !== null) {
        return this.authHttp.get(this._utilisateurUrl+id+'/', {headers:UtilService.getHeaders()})
              .map(UtilService.extractData)
              .catch(UtilService.handleError)
        }
      else {
        return this.http.get(this._utilisateurUrl+id+'/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
      }
    }

    getJardinsUtilisateur(id:number):Observable<Jardin[]> {
    return this.http.get(this._utilisateurUrl+id+'/membre_jardins/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
                .catch(UtilService.handleError)
     }

     getList():Observable< Utilisateur> {
    return this.http.get(this._utilisateurUrl, {headers:UtilService.getHeaders()})
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }

    patchUtilisateur(utilisateur:
           {id: number,
            username: string,
            first_name: string,
            last_name: string,
            email: string,
            //image: newImage,
            profil: {
              ville: string,
              presentation: string,
            }}):Observable<Utilisateur> {
      let body = JSON.stringify(utilisateur);
      let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
      let options = new RequestOptions({headers: headers});
      return this.authHttp.patch(this._utilisateurUrl + utilisateur.id + '/', body, options)
        .map(UtilService.extractData);
    }
}
