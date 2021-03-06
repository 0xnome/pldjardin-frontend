import {Component, Injector, provide} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {ICustomModal, Modal, ModalConfig} from "angular2-modal";
import {Config, UtilisateurService, AuthService, Utilisateur, Jardin} from "app/shared/index";
import {AdresseComponent} from "app/+jardin/components/adresse/adresse.component";
import {
    EditionProfilModalData,
    EditionProfilModal
} from "app/+utilisateur/components/modal-edition-profil/edition_profil.modal.component";

import {
    CreationJardinModal,
    CreationJardinModalData
} from "app/+utilisateur/components/modal-creation-jardin/creation_jardin.modal.component";

@Component({
    selector: 'sd-utilisateur',
    templateUrl: 'app/+utilisateur/components/utilisateur.component.html',
    styleUrls: ['app/+utilisateur/components/utilisateur.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, AdresseComponent],
    viewProviders: [UtilisateurService, AuthService]
})
export class UtilisateurComponent {
    id:number;
    utilisateur:Utilisateur;
    moi:Utilisateur;
    jardins:Jardin[];

    constructor(private _router:Router,
                private utilisateurService:UtilisateurService,
                private authService:AuthService,
                private _routeParams:RouteParams,
                private modal:Modal) {
    }


    getProfil() {
        this.utilisateurService.getUtilisateur(this.id)
            .subscribe(
                utilisateur => this.utilisateur = utilisateur,
                error => console.log(error));
    }

    getJardins() {
        this.utilisateurService.getJardinsUtilisateur(this.id)
            .subscribe(jardins => this.jardins = jardins);
    }

    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this.getProfil();
        this.getJardins();

        if (this.authService.getId() !== null) {
            this.utilisateurService.getMe()
                .subscribe(utilisateur => this.moi = utilisateur);
        } else this.moi = null;
    }

    maFiche():boolean {
        if (this.moi && this.utilisateur) {
            return this.moi.id === this.utilisateur.id;
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
            ).catch(err => alert("ERROR"))
                .then(dialog => dialog.result)
                .then(result => this.getProfil())
                .catch(err => {console.log(err)});
    }

    creerJardin() {
        let resolvedBindings = Injector.resolve([provide(ICustomModal, {
                useValue: new CreationJardinModalData()
            })]),
            dialog = this.modal.open(
                <any>CreationJardinModal,
                resolvedBindings,
                new ModalConfig('lg', false, 27, 'modal-dialog')
            ).catch(err => alert("ERROR"))
                .then(dialog => dialog.result)
                .then(result => this.getJardins())
                .catch(err => {console.log(err)});
    }

    getApiUrl(url:string) {
        return Config.getApiUrl(url)
    }

    quitterJardin(id:number) {
        alert("todo !!!")
    }


}
