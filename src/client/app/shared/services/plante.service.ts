import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {UtilService, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Plante} from "./interfaces";

@Injectable()
export class PlanteService {
  constructor(private authHttp:AuthHttp) {
  }

  private _planteUrl = Config.api + '/plantes/';

  get(id:number):Observable<Plante> {
    return this.authHttp.get(this._planteUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  delete(id:number):Observable<Plante> {
    return this.authHttp.delete(this._planteUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(res => res)
      .catch(UtilService.handleError)
  }
}
