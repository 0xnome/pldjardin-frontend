import {Component, Input, Output,EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {Plante, PlanteService, CommentairePlante, CommentairePlanteService} from "../../../shared/index";
import {CommentairePlanteComponent} from "../commentaire-plante/commentaire-plante.component";



@Component({
  selector: 'sd-plante',
  templateUrl: 'app/+fiche_lopin/components/plante/plante.component.html',
  styleUrls: ['app/+fiche_lopin/components/plante/plante.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, CommentairePlanteComponent],
  providers: [PlanteService, CommentairePlanteService]
})
export class PlanteComponent {

  constructor(private planteService:PlanteService,
              private commentairesPlanteService:CommentairePlanteService) {
  }

  @Input() plante:plante;

  errorMessage:string;
  plante : Plante;
  commentairesPlantes:CommentairePlante;

  ngOnInit() {
    this.commentairesPlanteService.get(this.plante.id)
            .subscribe(
                commentairesPlante => this.commentairesPlantes = commentairesPlante);

  }
}
