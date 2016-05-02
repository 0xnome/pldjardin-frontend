import {Component, Input, Injectable} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Http} from 'angular2/http';
import {Jardin, JardinService, Config} from "../../../shared/index";
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {UtilService} from "../../../shared/services/util.service";


export class EditionJardinModalData {
    constructor(public idjardin:number) {
    }
}


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

    id:number;
    nom:string;
    site:string;
    horaire:string;
    contact:string;
    image:string;
    description:string;
    restreint:boolean;
    composteur:boolean;

    api = Config.api;

    constructor(private jardinService:JardinService, modelContentData:ICustomModal,
                private http:Http, dialog:ModalDialogInstance, private router:Router) {
        this.context = <EditionJardinModalData>modelContentData;
        this.dialog = dialog;
    }

    dismiss() {
        this.dialog.dismiss();
    }

    ngOnInit() {
        this.jardinService.getJardin(this.context.idjardin)
            .subscribe(
                jardin => this.jardin = jardin,
                error => console.log(error));
        /*this.id=jardin.id;
         this.nom;
         this.site;
         this.horaire;
         this.contact;
         this.image;
         this.description;
         this.restreint;
         this.composteur*/
    }

    envoyerModifs() {
        let newJardin = {
            id: this.jardin.id,
            nom: this.jardin.nom,
            site: this.jardin.site,
            contact: this.jardin.contact,
            horaire: this.jardin.horaire,
            //image: this.jardin.image,
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
