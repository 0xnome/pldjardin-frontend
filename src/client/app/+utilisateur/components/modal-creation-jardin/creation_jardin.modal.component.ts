import {Component, Injectable} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Jardin, JardinService, Config, CarteService} from "app/shared/index";
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Location} from "../../../shared/services/carte.service";

export class CreationJardinModalData {
  constructor() {
  }
}

@Component({
  selector: 'modal-content',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  templateUrl: "app/+utilisateur/components/modal-creation-jardin/creation_jardin.modal.component.html",
  providers: [JardinService, CarteService]
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
  vraiJardin:Jardin;
  jardin = {
    nom: "",
    site: "",
    contact: "",
    horaire: "",
    //image: newImage,
    adresse: {

      ville: "",
      code_postal: "",
      rue: "",
      lat: 0,
      long: 0
    },
    description: "",
    restreint: false,
    composteur: false
  };

  api = Config.api;

  constructor(private jardinService:JardinService,
              private modelContentData:ICustomModal,
              private carteService:CarteService,
              private dialog:ModalDialogInstance) {
    this.context = <CreationJardinModalData>modelContentData;
    this.dialog = dialog;
  }

  dismiss() {
    this.dialog.close();
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

    this.carteService.geoCode(this.jardin.adresse.rue + this.jardin.adresse.code_postal + this.jardin.adresse.ville).subscribe(res => {
      let location:Location = CarteService.parseGeoCodeResponse(res);
      this.jardin.adresse.lat = location.latitude;
      this.jardin.adresse.long = location.longitude;

      // inscription une fois qu'on a l'adresse
      this.jardinService.addJardin(this.jardin)
        .subscribe(
          jardin => {
            this.vraiJardin = jardin;
            this.dialog.close();
          },
          error => alert(error)
        );

    }, error => {
      alert(error);
    });


  }


}
