import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {JardinService} from "../../shared/index";
import {Jardin} from "../../shared/index";

@Component({
    selector: 'sd-jardin',
    templateUrl: 'app/+jardin/components/jardin.component.html',
    styleUrls: ['app/+jardin/components/jardin.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class JardinComponent {
    id:number;
    jardin:Jardin;
    errorMessage: string;

    constructor(
        private jardinService:JardinService,
        private _routeParams:RouteParams){}
    
    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this.jardinService.getJardin(this.id)
            .subscribe(
                jardin => this.jardin = jardin,
                error =>  this.errorMessage = <any>error);
    }

}
