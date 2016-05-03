import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {ActionsService, Lopin, Plante, CommentaireLopin, LopinService, CommentaireLopinService} from "app/shared/index";
import {PlanteComponent} from 'app/+fiche_lopin/components/plante/plante.component';
import {CommentaireComponent} from 'app/+jardin/components/commentaire/commentaire.component';
import {AjoutCommentaireComponent} from 'app/+jardin/components/ajout-commentaire/ajoutCommentaire.component'
import {QRCode} from "app/+fiche_lopin/components/QRCode";
import {DROPDOWN_DIRECTIVES, CollapseDirective} from "ng2-bootstrap"
import {AuthService} from "../../shared/services/auth.service";


@Component({
    selector: 'sd-fiche-lopin',
    templateUrl: 'app/+fiche_lopin/components/fiche_lopin.component.html',
    styleUrls: ['app/+fiche_lopin/components/fiche_lopin.component.css'],
    viewProviders: [LopinService, CommentaireLopinService, ActionsService, QRCode, AuthService],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES,
        CollapseDirective, PlanteComponent, AjoutCommentaireComponent, CommentaireComponent],
})

export class FicheLopinComponent {
    id:number;
    lopin:Lopin;
    plantes:Plante[];
    commentairesLopin:CommentaireLopin[];
    errorMessage:string;
    private typesActions;

    constructor(private _router:Router,
                private lopinService:LopinService,
                private authService:AuthService,
                private actionsService:ActionsService,
                private _routeParams:RouteParams,
                private qrCode:QRCode,
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
        return this.authService.getId()
    }

}
