import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {UtilService, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Action} from "./interfaces";

@Injectable()
export class ActionsService {
    constructor (private http: Http, private authHttp:AuthHttp) {}
    private _actionsUrl = Config.api + '/actions/';

    getTypesActions():Observable<string[][]> {
        return this.http.get(this._actionsUrl+'types/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    getAction(id:number):Observable<Action> {
        return this.http.get(this._actionsUrl+id+'/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }
}
