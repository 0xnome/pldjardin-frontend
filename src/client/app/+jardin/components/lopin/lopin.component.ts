import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {LopinService} from "../../../shared/index";
import {Lopin} from "../../../shared/index";

@Component({
    selector: 'sd-lopins',
    templateUrl: 'app/+jardin/components/lopin/lopin.component.html',
    styleUrls: ['app/+jardin/components/lopin/lopin.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [LopinService]
})
export class LopinComponent {
    id:number;
    errorMessage: string;
    lopins :Lopin[];

    constructor(
        private lopinService:LopinService,
        private _routeParams:RouteParams){}

    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this.lopinService.getlopins(this.id)
          .subscribe(
            lopins => this.lopins = lopins,
            error =>  this.errorMessage = <any>error);
    }

    convertdate (date:string){
      return new Date(date);
    }

}
