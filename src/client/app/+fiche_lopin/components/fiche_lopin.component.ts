import {Component, Injector, provide} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {
    ActionsService,
    Lopin,
    Plante,
    CommentaireLopin,
    LopinService,
    CommentaireLopinService,
    UtilisateurService,
    Utilisateur,
    AuthService
} from "app/shared/index";
import {PlanteComponent} from 'app/+fiche_lopin/components/plante/plante.component';
import {CommentaireComponent} from 'app/+jardin/components/commentaire/commentaire.component';
import {AjoutCommentaireComponent} from 'app/+jardin/components/ajout-commentaire/ajoutCommentaire.component'
import {QRCode} from "app/+fiche_lopin/components/QRCode";
import {DROPDOWN_DIRECTIVES, CollapseDirective} from "ng2-bootstrap"
import {ModalConfig, ICustomModal, Modal} from "angular2-modal/dist/commonjs/angular2-modal";
import {
    CreationPlanteModalData,
    CreationPlanteModal
} from "../../+jardin/components/modal-creation-plante/creation_plante.modal.component";
import {JardinService} from "../../shared/services/jardin.service";


@Component({
    selector: 'sd-fiche-lopin',
    templateUrl: 'app/+fiche_lopin/components/fiche_lopin.component.html',
    styleUrls: ['app/+fiche_lopin/components/fiche_lopin.component.css'],
    viewProviders: [LopinService, CommentaireLopinService, ActionsService, QRCode, AuthService, UtilisateurService, JardinService],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES,
        CollapseDirective, PlanteComponent, AjoutCommentaireComponent, CommentaireComponent],
})

export class FicheLopinComponent {
    id:number;
    lopin:Lopin;
    plantes:Plante[];
    commentairesLopin:CommentaireLopin[];
    errorMessage:string;
    user:Utilisateur;
    private typesActions;
    peutAjouterPlante:boolean;

    constructor(private _router:Router,
                private lopinService:LopinService,
                private authService:AuthService,
                private actionsService:ActionsService,
                private _routeParams:RouteParams,
                private jardinService:JardinService,
                private qrCode:QRCode,
                private modal:Modal,
                private utilisateurService:UtilisateurService,
                private commentaireLopinService:CommentaireLopinService) {
    }

    getLopin() {
        this.lopinService.get(this.id)
            .subscribe(
                lopin => this.lopin = lopin,
                error => this.errorMessage = <any>error);
        this.lopinService.getPlantesLopin(this.id)
            .subscribe(
                plantes => this.plantes = plantes);
        this.lopinService.getCommentairesLopin(this.id)
            .subscribe(
                commentairesLopin => this.commentairesLopin = commentairesLopin);
    }

    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this.getLopin();
        this.getTypesAction();

        if (this.authService.getId() !== null) {
            this.utilisateurService.getMe().subscribe(
                utilisateur => {
                    this.user = utilisateur;
                    this.checkIfPeutAjouterPlante();
                },
                error => {
                    console.error(error);
                })
        } else this.user = null;
    }

    checkIfPeutAjouterPlante() {
        if (!this.user) {
            this.peutAjouterPlante = false;
        } else {
            this.checkIfEstMembreDuJardin();
        }
    }

    checkIfEstMembreDuJardin() {

        this.lopinService.getJardinDuLopin(this.id).subscribe(res => {
                if (res.restreint) {
                    // faut être membre
                    for (let i = 0; i < res.membres.length; i++) {
                        if (res.membres[i] == this.user.id) {
                            // il peut ajouter une plante car il est membre
                            this.peutAjouterPlante = true;
                            return;
                        }
                    }
                } else {
                    this.peutAjouterPlante = true;
                }


            },
            error => {
                console.error(error);
                this.peutAjouterPlante = false;
            })

    }

    versFicheJardin(id:number) {
        this._router.navigate(['Jardin', {id: id}]);
    }

    deleteCommentaireEvent(id) {
        console.log("commentaire suprime " + id);
        this.commentaireLopinService.delete(id).subscribe(
            () => this.getLopin()
        );
    }

    ajouterCommentaireEvent(commentaire) {
        console.log("commentaire ajouté ");

        let commentaireLopin:CommentaireLopin = <CommentaireLopin>{};
        commentaireLopin.auteur = commentaire.auteur;
        commentaireLopin.texte = commentaire.texte;
        commentaireLopin.lopin = this.id;


        this.commentaireLopinService.post(commentaireLopin).subscribe(
            () => this.getLopin()
        );
    }

    getQrCode() {
        this.qrCode.getQrCode(window.location.href, "Ceci est un lopin partagé !");
    }

    getTypesAction() {
        //noinspection TypeScriptUnresolvedVariable
        this.actionsService.getTypesActions().subscribe(
            typesActions => this.typesActions = typesActions.types
        )
    }

    peutCommenter() {
        return this.authService.getId();
    }


    creerPlante() {
        let resolvedBindings = Injector.resolve([provide(ICustomModal, {
                useValue: new CreationPlanteModalData(this.lopin.id)
            })]),
            dialog = this.modal.open(
                <any>CreationPlanteModal,
                resolvedBindings,
                new ModalConfig('lg', false, 27, 'modal-dialog')
            ).catch(err => console.log(err))
                .then(dialog => dialog.result)
                .then(result => {
                    this.getLopin();
                })
                .catch(err => {
                    console.log(err)
                });
    }

    addActionLopin(action:string) {
        for (var plante of this.plantes) {
            this.actionsService.addAction(plante.id, action).subscribe(
                typesActions => this.getLopin()
            )
        }
    }

    peutFaireAction(){
        return this.authService.getId()
    }

}
