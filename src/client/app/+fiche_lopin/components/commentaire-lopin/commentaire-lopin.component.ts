import {Component, Input, Output,EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {CommentaireLopin} from "../../../shared/index";



@Component({
  selector: 'sd-commentaireLopin',
  templateUrl: 'app/+fiche_lopin/components/commentaires-lopin/commentaires-lopin.component.html',
  styleUrls: ['app/+fiche_lopin/components/commentaires-lopin/commentaires-lopin.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: []
})
export class CommentaireLopinComponent {

  constructor() {
  }
  @Input() commentairesLopin:CommentaireLopin;

  errorMessage:string;
  // TODO: recuperer l'utilisateur ?
}
