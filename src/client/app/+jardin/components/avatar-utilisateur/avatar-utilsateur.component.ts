import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {AdresseService} from "../../../shared/index";
import {Utilisateur} from "../../../shared/services/interfaces";
import {UtilisateurService} from "../../../shared/services/utilisateur.service";

@Component({
    selector: 'sd-avatar-utilisateur',
    template: `<img *ngIf="utilisateur" class="img-responsive user-photo" src="{{ utilisateur.profil.avatar ? utilisateur.profil.avatar : 'https://ssl.gstatic.com/accounts/ui/avatar_2x.png'}}" />`,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [UtilisateurService]
})


export class AvatarUtilisateurComponent {
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
