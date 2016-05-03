import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {Plante, AuthService, PlanteService,ActionsService, CommentairePlante, CommentairePlanteService} from "app/shared/index";
import {AjoutCommentaireComponent} from 'app/+jardin/components/ajout-commentaire/ajoutCommentaire.component'
import {CommentaireComponent} from 'app/+jardin/components/commentaire/commentaire.component'
import {QRCode} from "../QRCode";
import {DROPDOWN_DIRECTIVES, CollapseDirective} from "ng2-bootstrap"
import {NomUtilisateurComponent} from "app/+jardin/components/nom-utilisateur/nom-utilsateur.component";


@Component({
    selector: 'sd-plante',
    templateUrl: 'app/+fiche_lopin/components/plante/plante.component.html',
    styleUrls: ['app/+fiche_lopin/components/plante/plante.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, DROPDOWN_DIRECTIVES,CollapseDirective, AjoutCommentaireComponent,
        NomUtilisateurComponent, CommentaireComponent],
    providers: [PlanteService, CommentairePlanteService, QRCode, ActionsService, AuthService]
})
export class PlanteComponent {

    constructor(private planteService:PlanteService,
                private qrCode:QRCode,
                private authService:AuthService,
                private actionsService:ActionsService,
                private commentairePlanteService:CommentairePlanteService) {
    }

    @Input() plante:Plante;

    plante:Plante;
    commentairesPlante:CommentairePlante[];
    typesActions:string[][];
    toustypesActions:string[];
    actions;
    historiqueVisible = false;
    historiqueVisible = false;

    getCommentairesPlante() {
        this.planteService.getCommentairesPlante(this.plante.id)
            .subscribe(commentairesPlante => {
                //noinspection TypeScriptValidateTypes
                this.commentairesPlante = commentairesPlante;
                var objDiv = document.getElementById("comment" + this.plante.id);
              if(objDiv) {
                objDiv.scrollTop = objDiv.scrollHeight;
              }
            });
    }

    getActionsPlante(){
        this.actionsService.getActions(this.plante.id).subscribe(
            actions =>{this.actions = actions;}
        )
    }

    getTypesAction() {
        this.actionsService.getTypesActions().subscribe(
            typesActions =>{//noinspection TypeScriptUnresolvedVariable
              this.typesActions = typesActions.types;}
        )
    }

    getTousTypesAction() {
        this.actionsService.getTousTypesActions().subscribe(
            typesActions =>{//noinspection TypeScriptUnresolvedVariable
                this.toustypesActions = typesActions.types;}
        )
    }

    ajouterAction(action){
        this.actionsService.addAction(this.plante.id, action).subscribe(
            typesActions =>{this.getActionsPlante()}
        )
    }

    ngOnInit() {
        this.getActionsPlante();
        this.getCommentairesPlante();
        this.getTypesAction();
        this.getTousTypesAction();
    }

    deleteCommentaireEvent(id) {
        this.commentairePlanteService.delete(id).subscribe(
            () => this.getCommentairesPlante()
        );
    }

    ajouterCommentaireEvent(commentaire) {
        console.log("commentaire ajouté pour la plante :" + this.plante.id);

        let commentairePlante:CommentairePlante = <CommentairePlante>{};
        commentairePlante.auteur = commentaire.auteur;
        commentairePlante.texte = commentaire.texte;
        commentairePlante.plante = this.plante.id;

        this.commentairePlanteService.post(commentairePlante).subscribe(
            () => {
                this.getCommentairesPlante();
            }
        );
    }

    getQrCode(){
        this.qrCode.getQrCode(window.location.href, "Ceci est une plante partagée !");
    }


    peutCommenter() {
        return this.authService.getId()
    }

    getNomTypeActionFromType(nom:string){
        if(this.toustypesActions){
            return this.toustypesActions[''+nom]
        }
    }

    convertdate(date:string) {
        return new Date(date);
    }

}
