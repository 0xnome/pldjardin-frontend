import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {AuthHttp} from "angular2-jwt";
import {Lopin, Plante, CommentaireLopin, UtilService,Config} from "../../shared/index"

@Injectable()
export class LopinService {
  constructor (private authHttp: AuthHttp) {}
    private _lopinUrl = Config.api + '/lopins/';

    get(id:number):Observable<Lopin> {
      return this.authHttp.get(this._lopinUrl + id + '/', {headers:UtilService.getHeaders()})
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }

    getPlantesLopin(id:number):Observable<Plante[]> {
      return this.authHttp.get(this._lopinUrl + id + '/plantes/', {headers:UtilService.getHeaders()})
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }

    getCommentairesLopin(id:number):Observable<CommentaireLopin[]> {
      return this.authHttp.get(this._lopinUrl + id + '/commentaires/', {headers:UtilService.getHeaders()})
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }

}
