import {Component, Injector, provide} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {UtilisateurService, JardinService} from "../../shared/index";
import {Utilisateur, Adresse, Jardin} from "../../shared/index";
import {AdresseComponent} from "app/+jardin/components/adresse/adresse.component";
import {ICustomModal, Modal, ModalConfig} from "angular2-modal/dist/commonjs/angular2-modal";
import {EditionProfilModalData, EditionProfilModal} from "./modal-edition-profil/edition_profil.modal.component";
import {Config} from "../../shared/config";
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
        private _routeParams:RouteParams,
        private modal:Modal){}

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

    maFiche():boolean {
        if (this.moi && this.utilisateur) {
            return this.moi.id===this.utilisateur.id;
        }
        return false
    }

    versFicheJardin(id:number) {
      this._router.navigate(['Jardin', {id: id}]);
    }

    editProfil() {
        let resolvedBindings = Injector.resolve([provide(ICustomModal, {
                useValue: new EditionProfilModalData(this.utilisateur.id)
            })]),
            dialog = this.modal.open(
                <any>EditionProfilModal,
                resolvedBindings,
                new ModalConfig('lg', false, 27, 'modal-dialog')
            );
    }

    getApiUrl(url:string){
        return Config.getApiUrl(url)
    }

    quitterJardin(id:number){
        alert("todo !!!")
    }


}
