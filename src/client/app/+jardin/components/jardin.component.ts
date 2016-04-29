import {Injectable, Injector, provide, Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {JardinService, Jardin, Utilisateur} from "../../shared/index";
import {ActualiteComponent} from './actualite/actualite.component';
import {LopinComponent} from './lopin/lopin.component';
import {CommentaireComponent} from "./commentaire/commentaire.component";
import {Modal, ModalConfig, ICustomModal} from "angular2-modal"
import template = L.Util.template;
import {UtilisateurModal, utilisateurModalData} from "./modal-utilsateur/utilisateur.modal.component";
import {AdresseComponent} from "./adresse/adresse.component";
import {UtilisateurService} from "../../shared/services/utilisateur.service";
import {EditionJardinModalData, EditionJardinModal} from "./modal-edition-jardin/edition_jardin.modal.component";
import {CommentaireJardinService} from "../../shared/services/commentaireJardin.service";
import {AjoutCommentaireJardinComponent} from "./ajout-commentaire/ajoutCommentaire.component";

@Component({
    selector: 'sd-jardin',
    templateUrl: 'app/+jardin/components/jardin.component.html',
    styleUrls: ['app/+jardin/components/jardin.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ActualiteComponent, LopinComponent, CommentaireComponent, AdresseComponent, AjoutCommentaireJardinComponent],
    providers: [UtilisateurService, CommentaireJardinService]
})
export class JardinComponent {
    id:number;
    jardin:Jardin;
    user:Utilisateur;

    constructor(private jardinService:JardinService,
                private utilisateurService:UtilisateurService,
                private commentaireJardinService:CommentaireJardinService,
                private _routeParams:RouteParams,
                private modal:Modal) {
    }

    getJardin() {
        this.jardinService.getJardin(this.id)
            .subscribe(
                jardin => this.jardin = jardin,
                error => console.log(error));

    }

    ngOnInit() {
        this.id = +this._routeParams.get('id');

        this.getJardin();

        this.utilisateurService.getMe().subscribe(
            utilisateur => this.user = utilisateur,
            error => console.log(error));
    }

    estMembreDuJardin():boolean {
        if (this.user && this.jardin) {
            for (var membre of this.jardin.membres) {
                if (membre === this.user.id) {
                    return true
                }
            }
        }
        return false
    }
    
    estAdminDuJardin():boolean {
        if (this.user && this.jardin) {
            for (var admin of this.jardin.administrateurs) {
                if (admin === this.user.id) {
                    return true
                }
            }
        }
        return false
    }

    afficherMembres() {
        let resolvedBindings = Injector.resolve([provide(ICustomModal, {
                useValue: new utilisateurModalData(this.id)
            })]),
            dialog = this.modal.open(
                <any>UtilisateurModal,
                resolvedBindings,
                new ModalConfig('lg', false, 27, 'modal-dialog')
            );
    }

    deleteCommentaireEvent(id) {
        console.log("commentaire suprime " + id);
        this.commentaireJardinService.delete(id).subscribe(
            () => this.getJardin()
        );
    }

    ajouterCommentaireEvent(commentaire) {
        console.log("commentaire ajouté ");
        this.commentaireJardinService.post(commentaire).subscribe(
            () => this.getJardin()
        );
    }

    editJardin() {
        let resolvedBindings = Injector.resolve([provide(ICustomModal, {
                useValue: new EditionJardinModalData(this.jardin.id)
            })]),
            dialog = this.modal.open(
                <any>EditionJardinModal,
                resolvedBindings,
                new ModalConfig('lg', false, 27, 'modal-dialog')
            );
    }

}
