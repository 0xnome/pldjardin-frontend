import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {Router} from 'angular2/router';
import {CommentaireJardin} from "../../../shared/index";
import {CommentaireJardinService} from "../../../shared/services/commentaireJardin.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'sd-ajout-commentaire',
  templateUrl: 'app/+jardin/components/ajout-commentaire/ajoutCommentaire.component.html',
  styleUrls: ['app/+jardin/components/ajout-commentaire/ajoutCommentaire.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [AuthService]
})
export class AjoutCommentaireJardinComponent {

  constructor(private _router:Router,
              private authService:AuthService) {
  }

  @Input() idJardin:number;
  userid:number;
  userid = this.authService.getId();
  message:string;

  @Output() ajouterCommentaireEvent = new EventEmitter<CommentaireJardin>();


  errorMessage:string;

  ajouterCommentaire(texte) {
    console.log("coicou");
    if(texte=='' || texte == "Ajouter un commentaire") return ;
    let commentaireJardin:CommentaireJardin = <CommentaireJardin>{}
    commentaireJardin.jardin = this.idJardin;
    commentaireJardin.auteur = this.userid;
    commentaireJardin.texte = texte;
    this.ajouterCommentaireEvent.emit(commentaireJardin);
  }

  ngOnInit() {
    // this.lopinService.get(this.num)
    //   .subscribe(
    //     lopin => this.lopin = lopin,
    //     error => this.errorMessage = <any>error);
  }

}
