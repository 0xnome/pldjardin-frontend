import {Component, Renderer} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {AuthService} from "../shared/index";

@Component({
    selector: 'sd-navbar',
    templateUrl: 'app/components/navbar.component.html',
    styleUrls: ['app/components/navbar.component.css'],
    directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers: [AuthService, Renderer]
})
export class NavbarComponent {
    constructor(private _authService:AuthService, private _router:Router) {}

    open:boolean = false;

    monProfil(){
        this._router.navigate(['Utilisateur', {id: this._authService.getId()}]);
    }

    deconnexion(){
        this._authService.logout()
    }

    connexion(){
        this._authService.openConnexionModal()
    }
    
    isConnected(){
        return AuthService.authenticated()
    }

}
