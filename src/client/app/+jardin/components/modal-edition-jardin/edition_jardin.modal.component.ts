import {Component, Input, Injectable} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Http} from 'angular2/http';
import {Jardin, JardinService, Config} from "../../../shared/index";
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';


export class EditionJardinModalData {
    constructor(public idjardin: number) {}
}


//noinspection JSAnnotator
@Component({
    selector: 'modal-content',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: "app/+jardin/components/modal-edition-jardin/edition_jardin.modal.component.html",
    providers: [JardinService]
})

@Injectable()
export class EditionJardinModal implements ICustomModalComponent {
    dialog:ModalDialogInstance;
    context:EditionJardinModalData;
    jardin:Jardin;
    api = Config.api;
    constructor(private jardinService:JardinService, modelContentData:ICustomModal,
                private http: Http, dialog:ModalDialogInstance, private router:Router) {
        this.context = <EditionJardinModalData>modelContentData;
        this.dialog = dialog;
    }

    dismiss() {
        this.dialog.close();
    }

    ngOnInit() {
        this.jardinService.getJardin(this.context.idjardin)
            .subscribe(
                jardin => this.jardin = jardin,
                error => console.log(error));
    }


}
