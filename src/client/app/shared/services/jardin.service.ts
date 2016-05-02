import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {UtilService, Jardin, Config, CommentaireJardin} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Utilisateur, Adresse} from "./interfaces";

@Injectable()
export class JardinService {
    constructor (private http: Http, private authHttp:AuthHttp) {}
    private _jardinsUrl = Config.api + '/jardins/';

    getJardin(id:number):Observable<Jardin> {
        return this.http.get(this._jardinsUrl+id+'/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    getAdresseJardin(id:number):Observable<Adresse> {
        return this.http.get(this._jardinsUrl+id+'/adresse/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

      getCommentairesJardin(id:number):Observable<CommentaireJardin[]> {
        return this.authHttp.get(this._jardinsUrl+id+'/commentaires/', {headers:UtilService.getHeaders()})
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

    patchJardin(jardin:{id:number,
                        nom:string,
                        site:string,
                        contact:string,
                        horaire:string,
                        //image:string,
                        description:string,
                        restreint:boolean,
                        composteur:boolean}):Observable<Jardin> {
      let body = JSON.stringify(jardin);
      let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
      let options = new RequestOptions({headers: headers});
      return this.authHttp.patch(this._jardinsUrl + jardin.id+'/', body, options)
            .map(UtilService.extractData);
    }
}
