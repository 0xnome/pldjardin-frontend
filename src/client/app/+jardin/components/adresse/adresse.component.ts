import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {AdresseService, Adresse} from "../../../shared/index";

@Component({
    selector: 'sd-adresse-jardin',
    templateUrl: 'app/+jardin/components/adresse/adresse.component.html',
    styleUrls: ['app/+jardin/components/adresse/adresse.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [AdresseService]
})


export class AdresseComponent {
    constructor(private adresseService:AdresseService){}

    @Input() num: number;

    errorMessage: string;
    adresse :Adresse;

    ngOnInit() {
        this.adresseService.get(this.num)
          .subscribe(
            adresse => this.adresse = adresse,
            error =>  this.errorMessage = <any>error);
    }

}
