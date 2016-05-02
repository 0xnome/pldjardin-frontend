import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {UtilService, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {CommentairePlante} from "./interfaces";

@Injectable()
export class CommentairePlanteService {
  constructor(private authHttp:AuthHttp) {
  }

  private _commentaireUrl = Config.api + '/commentairesplante/';


  get(id:number):Observable<CommentairePlante> {
    return this.authHttp.get(this._commentaireUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  post(comment:CommentairePlante):Observable<CommentairePlante> {
    return this.authHttp.post(this._commentaireUrl, JSON.stringify(comment), {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  delete(id:number):Observable<CommentairePlante> {
    return this.authHttp.delete(this._commentaireUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(res => res)
      .catch(UtilService.handleError)
  }

}
