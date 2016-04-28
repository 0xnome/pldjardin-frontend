import {Observable}     from 'rxjs/Observable';
import {Injectable}     from 'angular2/core';
import {AuthHttp} from "angular2-jwt";
import {Lopin, UtilService,Config} from "../../shared/index"

@Injectable()
export class LopinService {
  constructor (private authHttp: AuthHttp) {}
    private _lopinUrl = Config.api + '/lopins/';

    get(id:number):Observable<Lopin> {
      return this.authHttp.get(this._lopinUrl + id + '/', {headers:UtilService.getHeaders()})
        .map(UtilService.extractData)
        .catch(UtilService.handleError)
    }

}
