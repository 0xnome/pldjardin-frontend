import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {ActualiteService, Actualite} from "../../../shared/index";
import {NomUtilisateurComponent} from "../nom-utilisateur/nom-utilsateur.component";

@Component({
    selector: 'sd-actualitie',
    templateUrl: 'app/+jardin/components/actualite/actualite.component.html',
    styleUrls: ['app/+jardin/components/actualite/actualite.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,NomUtilisateurComponent],
    providers: [ActualiteService]
})


export class ActualiteComponent {
    constructor(private actualiteService:ActualiteService){}

    @Input() num: number;
    
    errorMessage: string;
    actualite :Actualite;

    ngOnInit() {
        this.actualiteService.get(this.num)
          .subscribe(
            actualite => this.actualite = actualite,
            error =>  this.errorMessage = <any>error);
    }

    convertdate (date:string){
      return new Date(date);
    }

}
