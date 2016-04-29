import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {AdresseService, Adresse} from "../../../shared/index";

@Component({
    selector: 'sd-adresse-jardin',
    template: `<div *ngIf="adresse">{{adresse.rue}}, {{adresse.ville}} {{adresse.code_postal}}</div>`,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [AdresseService]
})


export class AdresseComponent {
    constructor(private adresseService:AdresseService){}

    @Input() num: number;

    adresse :Adresse;

    ngOnInit() {
        this.adresseService.get(this.num)
          .subscribe(
            adresse => this.adresse = adresse,
            error =>  console.log(error));
    }

}
