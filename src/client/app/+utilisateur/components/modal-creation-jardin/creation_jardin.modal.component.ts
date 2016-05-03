import {Component, Input, Injectable} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Http} from 'angular2/http';
import {Jardin, JardinService, Config} from "../../../shared/index";
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {UtilService} from "../../../shared/services/util.service";


export class CreationJardinModalData {
    constructor() {
    }
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
    jardin:Jardin;

    rue:string;
    ville:string;
    code_postal:string;

    api = Config.api;

    constructor(private jardinService:JardinService, modelContentData:ICustomModal,
                private http:Http, dialog:ModalDialogInstance, private router:Router) {
        this.context = <CreationJardinModalData>modelContentData;
        this.dialog = dialog;
    }

    dismiss() {
        this.dialog.dismiss();
    }

    ngOnInit() {

    }

    envoyerModifs() {
      let newImage:string;
      /*console.log(this.upImage);
      if(this.upImage) {
        newImage=this.upImage;
      } else {
        newImage=this.jardin.image;
      }
      console.log(newImage);*/
      let newJardin = {
            id: this.jardin.id,
            nom: this.jardin.nom,
            site: this.jardin.site,
            contact: this.jardin.contact,
            horaire: this.jardin.horaire,
            //image: newImage,
            rue: this.rue,
            ville: this.ville,
            code_postal: this.code_postal,
            description: this.jardin.description,
            restreint: this.jardin.restreint,
            composteur: this.jardin.composteur
        };
        this.jardinService.patchJardin(newJardin)
            .subscribe(
                jardin => {
                    this.jardin = jardin;
                    this.dialog.close();
                },
                error => alert(error)
            );

    }
}
