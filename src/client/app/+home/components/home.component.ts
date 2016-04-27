import {Component, provide, Injector} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {ModalConfig, Modal, ICustomModal, ModalDialogInstance} from 'angular2-modal';

import {ROUTER_DIRECTIVES} from "angular2/router";
import {ConnexionModal, ConnexionModalData} from "./connexion.modal.component";
import {AuthService} from "../../shared/index";


@Component({
    selector: 'sd-home',
    templateUrl: 'app/+home/components/home.component.html',
    styleUrls: ['app/+home/components/home.component.css'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers: [Modal, AuthService]
})
export class HomeComponent {
    id:string = '2';
    connecte:boolean = false;
    
    public lastModalResult: string;
    constructor(private _router:Router, private modal: Modal, private _authService:AuthService) {
    }

    getJardin() {
        this._router.navigate(['Jardin', {id: this.id}]);
    }

    processDialog(dialog: Promise<ModalDialogInstance>) {
        dialog.then((resultPromise) => {
            return resultPromise.result.then((result) => {
                this.lastModalResult = result;
            }, () => this.lastModalResult = 'Rejected!');
        });
    }

    openCustomModal() {
        let resolvedBindings = Injector.resolve([provide(ICustomModal, {
                useValue: new ConnexionModalData()})]),
            dialog = this.modal.open(
                <any>ConnexionModal,
                resolvedBindings,
                new ModalConfig('lg', false, 27, 'modal-dialog')
            );
        this.processDialog(dialog);
    }

    ngOnInit() {
        if(AuthService.authenticated()){
            this.connecte = true;
        }
    }

    isConnected(){
        return AuthService.authenticated()
    }
    

}
