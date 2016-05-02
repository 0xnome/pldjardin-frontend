import {Injectable, Injector, provide, Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {JardinService, Jardin, Utilisateur} from "../../shared/index";
import {ActualiteComponent} from './actualite/actualite.component';
import {LopinComponent} from './lopin/lopin.component';
import {CommentaireComponent} from "./commentaire/commentaire.component";
import {Modal, ModalConfig, ICustomModal, ModalDialogInstance} from "angular2-modal"
import template = L.Util.template;
import {UtilisateurModal, utilisateurModalData} from "./modal-utilsateur/utilisateur.modal.component";
import {AdresseComponent} from "./adresse/adresse.component";
import {UtilisateurService} from "../../shared/services/utilisateur.service";
import {EditionJardinModalData, EditionJardinModal} from "./modal-edition-jardin/edition_jardin.modal.component";
import {CommentaireJardinService} from "../../shared/services/commentaireJardin.service";
import {ActionsService} from "../../shared/services/actions.service";
import {AjoutCommentaireComponent} from "./ajout-commentaire/ajoutCommentaire.component";
import {CommentaireJardin} from "../../shared/services/interfaces";


@Component({
    selector: 'sd-jardin',
    templateUrl: 'app/+jardin/components/jardin.component.html',
    styleUrls: ['app/+jardin/components/jardin.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ActualiteComponent, LopinComponent, CommentaireComponent, AdresseComponent, AjoutCommentaireComponent],
    providers: [UtilisateurService, CommentaireJardinService]
})
export class JardinComponent {
    id:number;
    jardin:Jardin;
    user:Utilisateur;
    commentaireJardin:CommentaireJardin;
    commentairesJardin:CommentaireJardin[];

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

        this.jardinService.getCommentairesJardin(this.id)
            .subscribe(
                commentairesJardin => this.commentairesJardin = commentairesJardin,
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
                useValue: new utilisateurModalData(this.jardin)
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
        let commentaireJardin:CommentaireJardin = <CommentaireJardin>{};
        commentaireJardin.auteur = commentaire.auteur;
        commentaireJardin.texte = commentaire.texte;
        commentaireJardin.jardin = this.id;

        this.commentaireJardinService.post(commentaireJardin).subscribe(
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
            )       .catch(err => alert("ERROR")) // catch error not related to the result (modal open...)
                .then(dialog => dialog.result) // dialog has more properties,lets just return the promise for a result.
                .then(result => this.getJardin()) // if were here ok was clicked.
                .catch(err => alert("CANCELED")); // if were here it was cancelled (click or non block click)

    }

    rejoindreJardin(){
        this.jardinService.joinJardin(this.id)
            .subscribe(
                jardin => {this.getJardin()},
                error => console.log(error));
    }

    quitterJardin(){
        this.jardinService.quitJardin(this.id)
            .subscribe(
                jardin => {this.getJardin()},
                error => console.log(error));
    }



}
