import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http} from 'angular2/http';
import {UtilService, Jardin, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class AdresseService {
    constructor (private http: Http, private authHttp:AuthHttp) {}
    private _url = Config.api + '/actualites/';
    
    get(id:number):Observable<Jardin> {
        return this.authHttp.get(this._url+id+'/')
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }
    
    getList():Observable<Jardin> {
    return this.http.get(this._url)
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }
}
