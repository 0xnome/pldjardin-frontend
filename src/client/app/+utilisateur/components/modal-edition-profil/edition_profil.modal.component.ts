import {Component, Input, Injectable} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Http} from 'angular2/http';
import {Utilisateur, UtilisateurService, Config} from "../../../shared/index";
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {UtilService} from "../../../shared/services/util.service";


export class EditionProfilModalData {
    constructor(public idutilisateur: number) {}
}


//noinspection JSAnnotator
@Component({
    selector: 'modal-content',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: "app/+utilisateur/components/modal-edition-profil/edition_profil.modal.component.html",
    providers: [UtilisateurService]
})

@Injectable()
export class EditionProfilModal implements ICustomModalComponent {
    dialog:ModalDialogInstance;
    context:EditionProfilModalData;
    utilisateur:Utilisateur;

    id:number;
    username:string;
    first_name:string;
    last_name:string;
    email:string;
    profil:{
      id:number;
      ville:string;
      presentation:string;
      avatar:string;
    };

    api = Config.api;
    constructor(private utilisateurService:UtilisateurService, modelContentData:ICustomModal,
                private http: Http, dialog:ModalDialogInstance, private router:Router) {
        this.context = <EditionProfilModalData>modelContentData;
        this.dialog = dialog;
    }

    dismiss() {
        this.dialog.close();
    }

    ngOnInit() {
        this.utilisateurService.getUtilisateur(this.context.idutilisateur)
            .subscribe(
                utilisateur => this.utilisateur = utilisateur,
                error => console.log(error));
    }

    envoyerModifs() {
      let newJardin = {
            //TODO
        };
        /*this.utilisateurService.patchJardin(newJardin)
          .subscribe(
                jardin => this.jardin = jardin,
                error => console.log(error));*/
        this.dialog.close();

    }
}
