import {Component, Input, Output,EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {Commentaire} from "../../../shared/index";
import {NomUtilisateurComponent} from "../nom-utilisateur/nom-utilsateur.component";
import {AvatarUtilisateurComponent} from "../avatar-utilisateur/avatar-utilsateur.component";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'sd-commentaire',
  templateUrl: 'app/+jardin/components/commentaire/commentaire.component.html',
  styleUrls: ['app/+jardin/components/commentaire/commentaire.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,NomUtilisateurComponent,AvatarUtilisateurComponent],
  providers: [ AuthService]
})
export class CommentaireComponent {

  constructor(private authService:AuthService) {
  }

  @Input() commentaire:Commentaire;
  @Output() deleteCommentaireEvent = new EventEmitter<number>();

  errorMessage:string;

  deleteCommentaire(id) {
    this.deleteCommentaireEvent.emit(id);
  }

  peutSupprimer(){
      return this.commentaire.auteur == this.authService.getId()
  }

  convertdate(date:string) {
    return new Date(date);
  }

}
