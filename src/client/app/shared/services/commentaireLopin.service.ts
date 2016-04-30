
import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {UtilService, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {CommentaireLopin} from "./interfaces";

@Injectable()
export class CommentaireLopinService {
  constructor(private authHttp:AuthHttp) {
  }

  private _commentaireUrl = Config.api + '/commentaireslopin/';

  get(id:number):Observable<CommentaireLopin> {
    return this.authHttp.get(this._commentaireUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

}