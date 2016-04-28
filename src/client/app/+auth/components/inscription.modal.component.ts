import {Component, Input, Injectable} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {UtilService, Config} from "../../shared/index";

//noinspection JSAnnotator
@Component({
    selector: 'modal-content',
    directives: [CORE_DIRECTIVES],
    templateUrl: "app/+auth/components/inscription.modal.component.html",
})

@Injectable()
export class InscriptionModal implements ICustomModalComponent {

    dialog:ModalDialogInstance;
    private _registerUrl = Config.api + '/utilisateurs/inscription/';

    username:string;
    email:string;
    mdp:string;


    constructor(private http: Http, dialog:ModalDialogInstance) {
        this.dialog = dialog;
    }

    dismiss() {
        this.dialog.close();
    }

    register() {
        let cred = {
            username: this.username,
            email: this.email,
            password: this.mdp
        };
        let body = JSON.stringify(cred);
        let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
        let options = new RequestOptions({headers: headers});
        this.dialog.close();

        return this.http.post(this._registerUrl, body, options)
            .map(UtilService.extractData)
            .subscribe(
                data => this.saveJwt(data),
                err => console.log(err),
                () => true
            );
    }

    saveJwt(jwt) {
        console.log(jwt.token);
        if(jwt) {
            localStorage.setItem('id_token', jwt.token)
        }
    }
}