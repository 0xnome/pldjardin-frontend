import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {Plante, PlanteService, CommentairePlante} from "../../../shared/index";
import {CommentairePlanteComponent} from "../commentaire-plante/commentaire-plante.component";
import {Config} from "../../../shared/config";


@Component({
    selector: 'sd-plante',
    templateUrl: 'app/+fiche_lopin/components/plante/plante.component.html',
    styleUrls: ['app/+fiche_lopin/components/plante/plante.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, CommentairePlanteComponent],
    providers: [PlanteService]
})
export class PlanteComponent {

    constructor(private planteService:PlanteService) {
    }

    @Input() plante:plante;

    errorMessage:string;
    plante:Plante;
    commentairesPlante:CommentairePlante[];

    ngOnInit() {
        this.planteService.getCommentairesPlante(this.plante.id)
            .subscribe(
                commentairesPlante => this.commentairesPlante = commentairesPlante);

    }

    getApiUrl(url:string) {
        return Config.getApiUrl(url)
    }
}
