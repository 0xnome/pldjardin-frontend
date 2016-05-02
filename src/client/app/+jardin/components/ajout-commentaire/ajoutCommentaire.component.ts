import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {Router} from 'angular2/router';
import { Commentaire  } from "../../../shared/index";
import {CommentaireJardinService} from "../../../shared/services/commentaireJardin.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
    selector: 'sd-ajout-commentaire',
    templateUrl: 'app/+jardin/components/ajout-commentaire/ajoutCommentaire.component.html',
    styleUrls: ['app/+jardin/components/ajout-commentaire/ajoutCommentaire.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [AuthService]
})
export class AjoutCommentaireComponent {

    constructor(private _router:Router,
                private authService:AuthService) {
    }

    @Input() id:number;
    userid:number;
    userid = this.authService.getId();
    message:string;

    @Output() ajouterCommentaireEvent = new EventEmitter<Commentaire>();

    errorMessage:string;

    ajouterCommentaire() {
        if (this.message.length == 0) return;

        let commentaire:Commentaire = <Commentaire>{}
        commentaire.auteur = this.userid;
        commentaire.texte = this.message;
        this.ajouterCommentaireEvent.emit(commentaire);

        this.message = "";

    }

}
