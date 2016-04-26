import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';

@Component({
    selector: 'sd-utilisateur',
    templateUrl: 'app/+utilisateur/components/utilisateur.component.html',
    styleUrls: ['app/+utilisateur/components/utilisateur.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class UtilisateurComponent {
    id:String;

    constructor(
        private _router:Router,
        private _routeParams:RouteParams){}
    
    ngOnInit() {
        this.id = this._routeParams.get('id');
    }

}
