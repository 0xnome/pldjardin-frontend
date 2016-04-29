import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {UtilisateurService, JardinService} from "../../shared/index";
import {Utilisateur, Adresse, Jardin} from "../../shared/index";
import {AdresseComponent} from "app/+jardin/components/adresse/adresse.component";
/*import {Http, HTTP_PROVIDERS} from 'angular2/http';*/

@Component({
    selector: 'sd-utilisateur',
    templateUrl: 'app/+utilisateur/components/utilisateur.component.html',
    styleUrls: ['app/+utilisateur/components/utilisateur.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, AdresseComponent],
    viewProviders: [UtilisateurService]
})
export class UtilisateurComponent {
    id:number;
    utilisateur:Utilisateur;
    moi:Utilisateur;
    jardins: Jardin[];
    errorMessage:string;

    constructor(
        private _router:Router,
        private utilisateurService:UtilisateurService,
        private _routeParams:RouteParams){}

    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this.utilisateurService.getUtilisateur(this.id)
            .subscribe(
                utilisateur => this.utilisateur = utilisateur,
                error => this.errorMessage = <any>error);
        this.utilisateurService.getJardinsUtilisateur(this.id)
            .subscribe(
                jardins => this.jardins = jardins);
        this.utilisateurService.getMe()
          .subscribe(
                utilisateur => this.moi = utilisateur);
    }

    versFicheJardin(id:number) {
      this._router.navigate(['Jardin', {id: id}]);
    }



}
