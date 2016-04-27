import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {AuthService} from "../../shared/index";

import {Modal, ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';

export class ConnexionModalData {
    constructor() {}
}

@Component({
    selector: 'modal-content',
    directives: [CORE_DIRECTIVES],
    templateUrl: "app/+home/components/connexion.modal.component.html",
    providers: [AuthService]
})


export class ConnexionModal implements ICustomModalComponent {
    dialog:ModalDialogInstance;
    context:ConnexionModalData;

    username:string;
    mdp:string;

    constructor(dialog:ModalDialogInstance, modelContentData:ICustomModal,
    private _authService:AuthService) {
        this.dialog = dialog;
        this.context = <ConnexionModalData>modelContentData;
    }

    dismiss(){
        this.dialog.close();
    }

    loginModal(){
        let cred = this._authService.login(this.username, this.mdp);
        this.dialog.close();
    }
}