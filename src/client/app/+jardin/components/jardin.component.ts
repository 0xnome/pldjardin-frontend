import {Injectable, Injector, provide, Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {JardinService} from "../../shared/index";
import {Jardin, Utilisateur} from "../../shared/index";
import {ActualiteComponent} from './actualite/actualite.component';
import {LopinComponent} from './lopin/lopin.component';
import {CommentaireComponent} from "./commentaire/commentaire.component";
import {Modal, ModalConfig, ICustomModal} from "angular2-modal"
import template = L.Util.template;
import {UtilisateurModal, utilisateurModalData} from "./modal-utilsateur/utilisateur.modal.component";
import {AdresseComponent} from "./adresse/adresse.component";
import {UtilisateurService} from "../../shared/services/utilisateur.service";

@Component({
    selector: 'sd-jardin',
    templateUrl: 'app/+jardin/components/jardin.component.html',
    styleUrls: ['app/+jardin/components/jardin.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ActualiteComponent, LopinComponent, CommentaireComponent, AdresseComponent],
    providers: [UtilisateurService]
})
export class JardinComponent {
    id:number;
    jardin:Jardin;
    user:Utilisateur;

    constructor(private jardinService:JardinService,
                private utilisateurService:UtilisateurService,
                private _routeParams:RouteParams,
                private modal:Modal) {
    }

    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this.jardinService.getJardin(this.id)
            .subscribe(
                jardin => this.jardin = jardin,
                error => console.log(error));

        this.utilisateurService.getMe().subscribe(
                utilisateur => this.user = utilisateur,
                error => console.log(error));
    }
    
    estMembreDuJardin():boolean{
        if(this.user && this.jardin){
            for(var membre of this.jardin.membres){
                if(membre === this.user.id){
                    return true
                }
            }
        }
        return false
    }



    afficherMembres(){
        let resolvedBindings = Injector.resolve([provide(ICustomModal, {
                useValue: new utilisateurModalData(this.id)})]),
            dialog = this.modal.open(
                <any>UtilisateurModal,
                resolvedBindings,
                new ModalConfig('lg', false, 27, 'modal-dialog')
            );
    }

}
