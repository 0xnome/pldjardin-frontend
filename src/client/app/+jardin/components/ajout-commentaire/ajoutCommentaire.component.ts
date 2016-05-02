import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {Router} from 'angular2/router';
import {CommentaireJardin, CommentaireLopin, CommentairePlante, Commentaire  } from "../../../shared/index";
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

    @Input() id:number;
    @Input() typeDeCommentaire:string;
    userid:number;
    userid = this.authService.getId();
    message:string;

    @Output() ajouterCommentaireEvent = new EventEmitter<Commentaire>();



    errorMessage:string;

    ajouterCommentaire() {
        if (this.message.length == 0) return;

        if (this.typeDeCommentaire == "jardin"){
            let commentaire:CommentaireJardin = <CommentaireJardin>{}
            commentaire.jardin = this.id;
        }
        if (this.typeDeCommentaire == "lopin"){
            let commentaire:CommentaireLopin = <CommentaireLopin>{}
            commentaire.lopin = this.id;
        }
        if (this.typeDeCommentaire == "plante"){
            let commentaire:CommentairePlante = <CommentairePlante>{}
            commentaire.plante = this.id;
        }

        console.log("ajout de commentaire de type : " + this.typeDeCommentaire );

        if !(typeof this.typeDeCommentaire == undefined){

            commentaire.auteur = this.userid;
            commentaire.texte = this.message;

            this.ajouterCommentaireEvent.emit(commentaire);
        }
        this.message = "";

    }

    ngOnInit() {
        // this.lopinService.get(this.num)
        //   .subscribe(
        //     lopin => this.lopin = lopin,
        //     error => this.errorMessage = <any>error);
    }

}
