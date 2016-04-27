import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Actualite, UtilService} from "../../shared/index"

@Injectable()
export class ActualiteService {
    constructor (private http: Http) {}
    private _actualiteUrl = 'assets/json/actualite.json';

    get(id:number):Observable<Actualite[]> {
        return this.http.get(this._actualiteUrl + id + '/')
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }
}
