import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http} from 'angular2/http';
import {UtilService, Jardin, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class JardinService {
    constructor (private http: Http, private authHttp:AuthHttp) {}
    private _jardinsUrl = Config.api + '/jardins/';
    
    jardin:Jardin;
    
    getJardin(id:number):Observable<Jardin> {
        return this.authHttp.get(this._jardinsUrl+id+'/')
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }
    
    getList():Observable<Jardin> {
    return this.http.get(this._jardinsUrl)
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }
}
