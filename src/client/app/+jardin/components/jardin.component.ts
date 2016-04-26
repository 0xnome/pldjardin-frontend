import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {JardinService, Jardin} from "../../shared/index";

@Component({
    selector: 'sd-jardin',
    templateUrl: 'app/+jardin/components/jardin.component.html',
    styleUrls: ['app/+jardin/components/jardin.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class JardinComponent {
    newName:string;
    id:number;
    jardin:Jardin;

    constructor(
        private jardinService:JardinService,
        private _router:Router,
        private _routeParams:RouteParams){}
    
    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this.jardin = this.jardinService.get()
    }

}
