import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {UtilService, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {CommentaireJardin} from "./interfaces";
import {Http} from "angular2/http";

@Injectable()
export class CommentaireJardinService {
  constructor(private authHttp:AuthHttp, private http: Http) {
  }

  private _commentaireUrl = Config.api + '/commentairesjardin/';

  get(id:number):Observable<CommentaireJardin> {
    return this.http.get(this._commentaireUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  post(comment:CommentaireJardin):Observable<CommentaireJardin> {
    return this.authHttp.post(this._commentaireUrl, JSON.stringify(comment), {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  delete(id:number):Observable<CommentaireJardin> {
    return this.authHttp.delete(this._commentaireUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(res => res)
      .catch(UtilService.handleError)
  }
}
