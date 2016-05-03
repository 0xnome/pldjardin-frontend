import {Component, Injectable, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Config} from "app/shared/index";
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {PlanteService} from "../../../shared/services/plante.service";
import {Plante} from "../../../shared/services/interfaces";

export class CreationPlanteModalData {
  constructor(public idLopin:number) {
  }
}

@Component({
  selector: 'modal-content',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  templateUrl: "app/+jardin/components/modal-creation-plante/creation_plante.modal.component.html",
  providers: [PlanteService]
})

@Injectable()
export class CreationPlanteModal implements ICustomModalComponent {


  beforeDismiss():boolean {
    return undefined;
  }

  beforeClose():boolean {
    return undefined;
  }

  dialog:ModalDialogInstance;
  context:CreationPlanteModalData;
  plante:Plante = {
    id: -1,
    lopin: -1,
    image: null,
    nom: "",
    description: "",
    espece: ""
  };
  api = Config.api;

  constructor(private planteServrice:PlanteService,
              private modelContentData:ICustomModal,
              private dialog:ModalDialogInstance) {
    this.context = <CreationPlanteModalData>modelContentData;
    this.dialog = dialog;
    this.plante.lopin = this.context.idLopin;
  }

  dismiss() {
    this.dialog.close();
  }

  ngOnInit() {
  }

  envoyerModifs() {
    this.planteServrice.addPlante(this.plante).subscribe(res => {
        console.log(res);
        this.dialog.close();
      },
      error => {
        console.log(error);
      })
  }

}
