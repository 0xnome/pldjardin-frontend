import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';
import {Injectable}     from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {UtilService} from "../../shared/index";

@Injectable()
export class AuthService {
    constructor (private http: Http,  private router: Router) {}
    private _authUrl = 'http://localhost:8000/api-token-auth/';

    login(username:string, password:string) {
        let cred = {
            username: username,
            password: password
        };
        let body = JSON.stringify(cred);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._authUrl, body, options)
            .map(UtilService.extractData)
            .subscribe(
                data => AuthService.saveJwt(data),
                err => false,
                () => true
            );
    }
    

    
    public logout() {
        localStorage.removeItem('id_token');
        this.router.navigate(['Home']);
    }

    static saveJwt(jwt) {
        console.log(jwt.token);
        if(jwt) {
            localStorage.setItem('id_token', jwt.token)
        }
    }

    public static authenticated() {
        return tokenNotExpired();
    }
}