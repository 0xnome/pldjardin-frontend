import {Component, Input, Output,EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {CommentaireJardinService} from "../../../shared/index";
import {CommentaireJardin,Jardin} from "../../../shared/index";
import {NomUtilisateurComponent} from "../nom-utilisateur/nom-utilsateur.component";
import {AvatarUtilisateurComponent} from "../avatar-utilisateur/avatar-utilsateur.component";

@Component({
  selector: 'sd-commentaire',
  templateUrl: 'app/+jardin/components/commentaire/commentaire.component.html',
  styleUrls: ['app/+jardin/components/commentaire/commentaire.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,NomUtilisateurComponent,AvatarUtilisateurComponent],
  providers: [CommentaireJardinService]
})
export class CommentaireComponent {

  constructor(private commentaireJardinService:CommentaireJardinService) {
  }

  @Input() num:number;
  @Output() deleteCommentaireEvent = new EventEmitter<number>();
  
  errorMessage:string;
  commentaireJardin : CommentaireJardin;

  ngOnInit() {
    this.commentaireJardinService.get(this.num)
      .subscribe(
        commentaireJardin => this.commentaireJardin = commentaireJardin,
        error => this.errorMessage = <any>error);
  }


  deleteCommentaire(id) {
    this.deleteCommentaireEvent.emit(id);
  }

  convertdate(date:string) {
    return new Date(date);
  }
  
}
