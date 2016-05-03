import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {Router} from 'angular2/router';
import {Commentaire} from "../../../shared/index";
import {CommentaireJardinService} from "../../../shared/services/commentaireJardin.service";
import {AuthService} from "../../../shared/services/auth.service";
import {Actualite} from "../../../shared/services/interfaces";

@Component({
  selector: 'sd-ajout-actualite',
  templateUrl: 'app/+jardin/components/ajout-actualite/ajoutActualite.component.html',
  styleUrls: ['app/+jardin/components/ajout-actualite/ajoutActualite.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [AuthService]
})
export class AjoutActualiteComponent {

  constructor(private _router:Router,
              private authService:AuthService) {
  }

  @Input() id:number;
  userid:number;
  userid = this.authService.getId();
  message:string;

  @Output() ajouterActualiteEvent = new EventEmitter<Actualite>();

  errorMessage:string;

  ajouterActualite() {
    if (this.message.length == 0) return;
    console.log("call from component")

    let actualite:Actualite = <Actualite>{};
    actualite.jardin = this.id;
    actualite.auteur = this.userid;
    actualite.texte = this.message;
    this.ajouterActualiteEvent.emit(actualite);

    this.message = "";

  }

}
