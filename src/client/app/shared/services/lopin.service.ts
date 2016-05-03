import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http, Headers, RequestOptions} from "angular2/http";
import {Lopin, Plante, CommentaireLopin, UtilService, Config} from "../../shared/index"
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Jardin} from "./interfaces";

@Injectable()
export class LopinService {
  constructor(private http:Http, private authHttp:AuthHttp) {
  }

  private _lopinUrl = Config.api + '/lopins/';

  get(id:number):Observable<Lopin> {
    return this.http.get(this._lopinUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  getPlantesLopin(id:number):Observable<Plante[]> {
    return this.http.get(this._lopinUrl + id + '/plantes/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  getCommentairesLopin(id:number):Observable<CommentaireLopin[]> {
    return this.http.get(this._lopinUrl + id + '/commentaires/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  addLopinJardin(lopin:{
    "jardin":number,
    "nom":string,
    "description":string}):Observable<Lopin> {
    let body = JSON.stringify(lopin);
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.authHttp.post(this._lopinUrl, body, options)
      .map(UtilService.extractData);
  }


  getJardinDuLopin(idLopin:number):Observable<Jardin> {
    return this.http.get(this._lopinUrl + idLopin + '/jardin/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError);
  }

}
