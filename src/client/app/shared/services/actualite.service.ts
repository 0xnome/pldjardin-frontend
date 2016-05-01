import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Actualite, UtilService,Config} from "../../shared/index"
import {Http} from 'angular2/http';

@Injectable()
export class ActualiteService {
    constructor (private http: Http) {}
    private _actualiteUrl = Config.api + '/actualites/';

    get(id:number):Observable<Actualite> {
        return this.http.get(this._actualiteUrl + id + '/', {headers:UtilService.getHeaders()})
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }
}
