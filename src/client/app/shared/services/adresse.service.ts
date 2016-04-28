import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http} from 'angular2/http';
import {UtilService, Adresse, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class AdresseService {
    constructor (private http: Http, private authHttp:AuthHttp) {}
    private _url = Config.api + '/adresses/';

    get(id:number):Observable<Adresse> {
        return this.authHttp.get(this._url+id+'/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    getList():Observable<Adresse> {
    return this.http.get(this._url, {headers:UtilService.getHeaders()})
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }
}
