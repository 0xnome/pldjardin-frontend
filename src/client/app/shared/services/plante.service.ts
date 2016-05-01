import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {UtilService, Config} from "../../shared/index";
import {Http} from "angular2/http";
import {Plante, CommentairePlante} from "./interfaces";

@Injectable()
export class PlanteService {
  constructor(private http:Http) {
  }

  private _planteUrl = Config.api + '/plantes/';

  get(id:number):Observable<Plante> {
    return this.http.get(this._planteUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  getCommentairesPlante(id:number):Observable<CommentairePlante> {
    return this.http.get(this._planteUrl + id + '/commentaires/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  delete(id:number):Observable<Plante> {
    return this.http.delete(this._planteUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(res => res)
      .catch(UtilService.handleError)
  }
}



