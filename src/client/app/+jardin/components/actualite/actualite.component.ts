import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {ActualiteService, Actualite} from "../../../shared/index";

@Component({
    selector: 'sd-actualities',
    templateUrl: 'app/+jardin/components/actualite/actualite.component.html',
    styleUrls: ['app/+jardin/components/actualite/actualite.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [ActualiteService]
})


export class ActualiteComponent {
    @Input()
    id: number;
    errorMessage: string;
    actualite :Actualite;

    constructor(
        private actualiteService:ActualiteService,
        private _routeParams:RouteParams){}

    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this.actualiteService.get(this.id)
          .subscribe(
            actualite => this.actualite = actualite,
            error =>  this.errorMessage = <any>error);
    }

    convertdate (date:string){
      return new Date(date);
    }

}
