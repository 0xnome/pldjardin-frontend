import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {AdresseService} from "../../../shared/index";
import {Utilisateur} from "../../../shared/services/interfaces";
import {UtilisateurService} from "../../../shared/services/utilisateur.service";

@Component({
    selector: 'sd-nom-utilisateur',
    template: `<em *ngIf="utilisateur">{{utilisateur.username}}<span *ngIf="utilisateur.first_name && utilisateur.last_name"> ({{utilisateur.first_name}} {{utilisateur.last_name}})</span></em>`,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [UtilisateurService]
})


export class NomUtilisateurComponent {
    constructor(private utilisateurService:UtilisateurService){}

    @Input() num: number;

    utilisateur :Utilisateur;

    ngOnInit() {
        this.utilisateurService.getUtilisateur(this.num)
          .subscribe(
            utilisateur => this.utilisateur = utilisateur,
            error =>  console.log(error));
    }

}
