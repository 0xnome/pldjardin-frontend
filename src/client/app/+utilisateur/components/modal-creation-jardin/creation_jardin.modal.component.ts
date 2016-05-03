import {Component, Injectable} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Jardin, JardinService, Config} from "app/shared/index";
import {ROUTER_DIRECTIVES} from 'angular2/router';

export class CreationJardinModalData {
    constructor() {   }
}

@Component({
    selector: 'modal-content',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: "app/+utilisateur/components/modal-creation-jardin/creation_jardin.modal.component.html",
    providers: [JardinService]
})

@Injectable()
export class CreationJardinModal implements ICustomModalComponent {
    beforeDismiss():boolean {
        return undefined;
    }

    beforeClose():boolean {
        return undefined;
    }

    dialog:ModalDialogInstance;
    context:CreationJardinModalData;
    vraiJardin: Jardin;
    jardin = {
            nom: "",
            site: "",
            contact: "",
            horaire: "",
            //image: newImage,
            adresse : {

            ville: "",
              code_postal: "",
            rue: ""},
            description: "",
            restreint: false,
            composteur: false
    };

    api = Config.api;

    constructor(private jardinService:JardinService,
                private modelContentData:ICustomModal,
                private dialog:ModalDialogInstance) {
        this.context = <CreationJardinModalData>modelContentData;
        this.dialog = dialog;
    }

    dismiss() {
        this.dialog.close();
    }

    ngOnInit() {}

    envoyerModifs() {
        let newImage:string;
        /*console.log(this.upImage);
         if(this.upImage) {
         newImage=this.upImage;
         } else {
         newImage=this.jardin.image;
         }
         console.log(newImage);*/
      console.log(this.jardin);

        this.jardinService.addJardin(this.jardin)
            .subscribe(
                jardin => {
                    this.vraiJardin = jardin;
                    this.dialog.close();
                },
                error => alert(error)
            );

    }
}
