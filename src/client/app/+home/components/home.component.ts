import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {ModalConfig, Modal, ICustomModal, ModalDialogInstance} from 'angular2-modal';

import {ROUTER_DIRECTIVES} from "angular2/router";


@Component({
    selector: 'sd-home',
    templateUrl: 'app/+home/components/home.component.html',
    styleUrls: ['app/+home/components/home.component.css'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers: [Modal]

})
export class HomeComponent {
    id:string = '2';

    constructor(private _router:Router, private modal: Modal) {
    }

    getJardin() {
        this._router.navigate(['Jardin', {id: this.id}]);
    }

    openConnexion() {
        this.modal.alert()
            .size('lg')
            .keyboard(27)
            .title('Connexion')
            .body('//TODO')
            .open()
    }

}
