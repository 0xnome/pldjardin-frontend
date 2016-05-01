import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {UtilService, Jardin, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {ReponseRecherche} from "./interfaces";

@Injectable()
export class RechercheService {

  private rechercheUrl = "/recherche/";

  constructor(private http:Http, private authHttp:AuthHttp) {
  }


  recherche(query:string):Observable<ReponseRecherche> {
    let encodedQuery = encodeURIComponent(query);

    return this.authHttp.get(Config.api+this.rechercheUrl+"?q="+encodedQuery, {headers:UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

  getAll():Observable<ReponseRecherche> {
    return this.authHttp.get(Config.api+this.rechercheUrl, {headers:UtilService.getHeaders()})
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }

}
