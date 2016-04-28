import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {UtilisateurService} from "../../shared/index";
import {Utilisateur} from "../../shared/index";
/*import {Http, HTTP_PROVIDERS} from 'angular2/http';*/

@Component({
    selector: 'sd-utilisateur',
    templateUrl: 'app/+utilisateur/components/utilisateur.component.html',
    styleUrls: ['app/+utilisateur/components/utilisateur.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    viewProviders: [UtilisateurService]
})
export class UtilisateurComponent {
    id:number;
    utilisateur:Utilisateur;

    constructor(
        private utilisateurService:UtilisateurService,
        private _routeParams:RouteParams){

    }
    
    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this.utilisateurService.getUtilisateur(this.id)
            .subscribe(
                utilisateur => this.utilisateur = utilisateur);
        }

}
