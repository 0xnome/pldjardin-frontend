import {Component, Injector, provide} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {ICustomModal, Modal, ModalConfig} from "angular2-modal";
import {Config, UtilisateurService, Utilisateur,Jardin} from "app/shared/index";
import {AdresseComponent} from "app/+jardin/components/adresse/adresse.component";
import {EditionProfilModalData, EditionProfilModal} from "app/+utilisateur/components/modal-edition-profil/edition_profil.modal.component";

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
                error => console.log(error));
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
