import {Component, Input, Injectable} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {UtilService, Config} from "../../shared/index";

export class ConnexionModalData {
    constructor() {
    }
}

@Component({
    selector: 'modal-content',
    directives: [CORE_DIRECTIVES],
    templateUrl: "app/+auth/components/connexion.modal.component.html",
})

@Injectable()
export class ConnexionModal implements ICustomModalComponent {

    dialog:ModalDialogInstance;
    context:ConnexionModalData;
    private _authUrl = Config.api + '/api-token-auth/';

    username:string;
    mdp:string;

    constructor(private http: Http, dialog:ModalDialogInstance, modelContentData:ICustomModal) {
        this.dialog = dialog;
        this.context = <ConnexionModalData>modelContentData;
    }

    dismiss() {
        this.dialog.close();
    }

    loginModal() {
        let cred = {
            username: this.username,
            password: this.mdp
        };
        let body = JSON.stringify(cred);
        let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
        let options = new RequestOptions({headers: headers});
        this.dialog.close();

        return this.http.post(this._authUrl, body, options)
            .map(UtilService.extractData)
            .subscribe(
                data => this.saveJwt(data),
                err => false,
                () => true
            );
    }

    saveJwt(jwt) {
        console.log(jwt.token);
        if(jwt) {
            localStorage.setItem('id_token', jwt.token)
        }
    }

    beforeDismiss():boolean {
        return true;
    }

    beforeClose():boolean {
        return true;
    }


}