import {Component, Input, Output,EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {Plante, PlanteService, CommentairePlante, CommentairePlanteService} from "../../../shared/index";



@Component({
  selector: 'sd-plante',
  templateUrl: 'app/+fiche_lopin/components/plante/plante.component.html',
  styleUrls: ['app/+fiche_lopin/components/plante/plante.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [PlanteService, CommentairePlanteService]
})
export class PlanteComponent {

  constructor(private planteService:PlanteService,
              private commentairesPlanteService:CommentairePlanteService) {
  }

  @Input() plante:plante;

  errorMessage:string;
  plante : Plante;
  commentairesPlante:CommentairePlante;

  ngOnInit() {
    this.commentairesPlanteService.get(this.plante.id)
            .subscribe(
                commentairesPlante => this.commentairesPlante = commentairesPlante);

  }

  convertdate (date:string){
      return new Date(date);
    }

}
