import {Component, provide, Injector} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AuthService} from "../../shared/index";

@Component({
    selector: 'sd-home',
    templateUrl: 'app/+home/components/home.component.html',
    styleUrls: ['app/+home/components/home.component.css'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers: [AuthService]
})

export class HomeComponent {
    id:string = '2';
    connecte:boolean = false;
    constructor(private _router:Router, private _authService:AuthService) {}

    getJardin() {
        this._router.navigate(['Jardin', {id: this.id}]);
    }
    
    connexion(){
        this._authService.openConnexionModal();
    }
    
    inscription(){
        this._authService.openInscriptionModal();
    }

    ngOnInit() {
        if(AuthService.authenticated()){
            this.connecte = true;
        }
    }

    isConnected(){
        return AuthService.authenticated()
    }
}
