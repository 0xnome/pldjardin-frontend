import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {UtilService, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {CommentairePlante} from "./interfaces";

@Injectable()
export class CommentairePlanteService {
  constructor(private authHttp:AuthHttp) {
  }

  private _commentaireUrl = Config.api + '/plantes/';

  get(id:number):Observable<CommentairePlante> {
    return this.authHttp.get(this._commentaireUrl + id + '/commentaires/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

}
