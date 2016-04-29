import {Injectable, Injector, provide} from 'angular2/core';
import {Router} from 'angular2/router';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {ModalDialogInstance, ICustomModal, ModalConfig, Modal} from "angular2-modal";
import {ConnexionModalData, ConnexionModal} from "../../+auth/index";
import {InscriptionModal} from "../../+auth/components/inscription.modal.component";

@Injectable()
export class AuthService {
    private static jwtHelper;
    private lastModalResult;
    constructor (private modal:Modal, private router: Router) {}

    jwtHelper = new JwtHelper();
    
    public logout() {
        localStorage.removeItem('id_token');
        this.router.navigate(['Home']);
    }

    processDialog(dialog: Promise<ModalDialogInstance>) {
        dialog.then((resultPromise) => {
            return resultPromise.result.then((result) => {
                this.lastModalResult = result;
            }, () => this.lastModalResult = 'Rejected!');
        });
    }

    openConnexionModal() {
        let resolvedBindings = Injector.resolve([provide(ICustomModal, {
                useValue: new ConnexionModalData()})]),
            dialog = this.modal.open(
                <any>ConnexionModal,
                resolvedBindings,
                new ModalConfig('lg', false, 27, 'modal-dialog')
            );
        this.processDialog(dialog);
    }

    openInscriptionModal() {
        let resolvedBindings = Injector.resolve([provide(ICustomModal, {
                useValue: new ConnexionModalData()})]),
            dialog = this.modal.open(
                <any>InscriptionModal,
                resolvedBindings,
                new ModalConfig('lg', false, 27, 'modal-dialog')
            );
        this.processDialog(dialog);
    }

    public static authenticated() {
        return tokenNotExpired();
    }

    public getId() {
        var token = localStorage.getItem('id_token');
        if(token) return this.jwtHelper.decodeToken(token).user_id;
        return null;
    }
}
