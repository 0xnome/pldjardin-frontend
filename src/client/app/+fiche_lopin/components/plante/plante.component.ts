import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {Config} from "../../../shared/config";
import {Plante, PlanteService, CommentairePlante, CommentairePlanteService} from "../../../shared/index";
import {AjoutCommentaireComponent} from 'app/+jardin/components/ajout-commentaire/ajoutCommentaire.component'
import {CommentaireComponent} from 'app/+jardin/components/commentaire/commentaire.component'
import {QRCode} from "../QRCode";


@Component({
    selector: 'sd-plante',
    templateUrl: 'app/+fiche_lopin/components/plante/plante.component.html',
    styleUrls: ['app/+fiche_lopin/components/plante/plante.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, AjoutCommentaireComponent, CommentaireComponent],
    providers: [PlanteService, CommentairePlanteService, QRCode]
})
export class PlanteComponent {

    constructor(private planteService:PlanteService,
                private qrCode:QRCode,
                private commentairePlanteService:CommentairePlanteService) {
    }

    @Input() plante:Plante;

    errorMessage:string;
    plante:Plante;
    commentairesPlante:CommentairePlante[];

    getPlante() {
        this.planteService.getCommentairesPlante(this.plante.id)
            .subscribe(commentairesPlante => {
                //noinspection TypeScriptValidateTypes
                this.commentairesPlante = commentairesPlante;
                setTimeout(() => {
                    var objDiv = document.getElementById("comment" + this.plante.id);
                    objDiv.scrollTop = objDiv.scrollHeight;
                });
            });
    }

    ngOnInit() {
        this.getPlante()
    }

    deleteCommentaireEvent(id) {
        console.log("commentaire suprime " + id);
        this.commentairePlanteService.delete(id).subscribe(
            () => {this.getPlante();}
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
                this.getPlante();
            }
        );
    }

    getQrCode(){
        this.qrCode.getQrCode(window.location.href, "Ceci est une plante partagée !");
    }

}
