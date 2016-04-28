import {Component, Input, Injectable} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Utilisateur, JardinService, Config} from "../../../shared/index";
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';


export class utilisateurModalData {
    constructor(public idjardin: number) {}
}


//noinspection JSAnnotator
@Component({
    selector: 'modal-content',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: "app/+jardin/components/modal-utilsateur/utilisateur.modal.component.html",
    providers: [JardinService]
})

@Injectable()
export class UtilisateurModal implements ICustomModalComponent {
    dialog:ModalDialogInstance;
    context:utilisateurModalData;
    utilisateurs:Utilisateur[];
    api = Config.api;
    constructor(private jardinService:JardinService, modelContentData:ICustomModal,
                private http: Http, dialog:ModalDialogInstance, private router:Router) {
        this.context = <utilisateurModalData>modelContentData;
        this.dialog = dialog;
    }

    dismiss() {
        this.dialog.close();
    }

    goToUser(id:number){
        this.router.navigate(['Utilisateur', {id: id}]);
        this.dismiss()
    }

    ngOnInit() {
        this.jardinService.getUtilisateurs(this.context.idjardin)
            .subscribe(
                users => this.utilisateurs = users,
                error => console.log(error));
    }
    
    
}