import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {Actualite, UtilService,Config} from "../../shared/index"
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class ActualiteService {
    constructor (private authHttp: AuthHttp) {}
    private _actualiteUrl = Config.api + '/actualites/';

    get(id:number):Observable<Actualite> {
        return this.authHttp.get(this._actualiteUrl + id + '/')
            .map(UtilService.extractData)
            .catch(UtilService.handleError)
    }
}
