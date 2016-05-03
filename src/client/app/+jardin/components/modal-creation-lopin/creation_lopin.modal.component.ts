import {Component, Injectable, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Lopin, LopinService, Config, CarteService} from "app/shared/index";
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Location} from "../../../shared/services/carte.service";

export class CreationLopinModalData {
  constructor(public idJardin:number) {
  }
}

@Component({
  selector: 'modal-content',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  templateUrl: "app/+jardin/components/modal-creation-lopin/creation_lopin.modal.component.html",
  providers: [LopinService, CarteService]
})

@Injectable()
export class CreationLopinModal implements ICustomModalComponent {


  beforeDismiss():boolean {
    return undefined;
  }

  beforeClose():boolean {
    return undefined;
  }

  dialog:ModalDialogInstance;
  context:CreationLopinModalData;
  vraiLopin:Lopin;
  lopin = {
    jardin: -1,
    nom: "",
    description: ""
  };

  api = Config.api;

  constructor(private lopinService:LopinService,
              private modelContentData:ICustomModal,
              private carteService:CarteService,
              private dialog:ModalDialogInstance) {
    this.context = <CreationLopinModalData>modelContentData;
    this.dialog = dialog;
  }

  dismiss() {
    this.dialog.close();
  }

  ngOnInit() {
  }

  envoyerModifs() {
    console.log(this.lopin);

    this.lopinService.addLopinJardin(this.lopin)
      .subscribe(
        lopin => {
          this.vraiLopin = lopin;
          this.dialog.close();
        },
        error => alert(error)
      );
  }

}
