import {Component, Input, Output,EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {CommentairePlante} from "../../../shared/index";



@Component({
  selector: 'sd-commentairePlante',
  templateUrl: 'app/+fiche_lopin/components/commentaire-plante/commentaire-plante.component.html',
  styleUrls: ['app/+fiche_lopin/components/commentaire-plante/commentaire-plante.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: []
})
export class CommentairePlanteComponent {

  constructor() {
  }
  @Input() commentairePlante:CommentairePlante;

  errorMessage:string;
  // TODO: recuperer l'utilisateur ?

  convertdate(date:string) {
    return new Date(date);
  }
}
