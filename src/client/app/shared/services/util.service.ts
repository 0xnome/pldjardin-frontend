import {Http, Response, Headers} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

export class UtilService {

    public static extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || { };
    }

    public static handleError (error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
    public static getHeaders():Headers{
        return new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    }

}