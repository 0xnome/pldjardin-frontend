import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {UtilService, Config} from "../../shared/index";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {Action} from "./interfaces";
import {stringify} from "querystring";

@Injectable()
export class ActionsService {
    constructor (private http: Http, private authHttp:AuthHttp) {}
    private _actionsUrl = Config.api + '/actions/';
    private _planteUrl = Config.api + '/plantes/';
    private _lopinUrl = Config.api + '/lopins/';

    getTypesActions():Observable<string[][]> {
        return this.http.get(this._actionsUrl+'types/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    getTousTypesActions():Observable<string[][]> {
        return this.http.get(this._actionsUrl+'toustypes/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    getActions(id:number):Observable<Action> {
        return this.http.get(this._planteUrl+id+'/actions/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    addAction(idPlante:number, action:string) {
        return this.authHttp.post(this._actionsUrl, JSON.stringify({type:action, plante:idPlante}), {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }

    addActionLopin(idLopin:number, action:string) {
        return this.authHttp.post(this._lopinUrl+idLopin+"/actions", JSON.stringify({type:action}), {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }
}
