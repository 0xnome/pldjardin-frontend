import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Actualite, UtilService,Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Http} from 'angular2/http';

@Injectable()
export class ActualiteService {
    constructor (private http: Http,private authHttp:AuthHttp) {}
    private _actualiteUrl = Config.api + '/actualites/';

    get(id:number):Observable<Actualite> {
        return this.http.get(this._actualiteUrl + id + '/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

  post(comment:Actualite):Observable<Actualite> {
    return this.authHttp.post(this._actualiteUrl, JSON.stringify(comment), {headers: UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  delete(id:number):Observable<Actualite> {
    return this.authHttp.delete(this._actualiteUrl + id + '/', {headers: UtilService.getHeaders()})
      .map(res => res)
      .catch(UtilService.handleError)
  }
}
