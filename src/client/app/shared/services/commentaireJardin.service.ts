import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {UtilService, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {CommentaireJardin} from "./interfaces";

@Injectable()
export class CommentaireJardinService {
  constructor(private authHttp:AuthHttp) {
  }

  private _commentaireUrl = Config.api + '/commentairesjardin/';

  get(id:number):Observable<CommentaireJardin> {
    return this.authHttp.get(this._commentaireUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }
}
