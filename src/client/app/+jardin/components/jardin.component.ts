import {Component} from 'angular2/core';
import {NameListService} from "../../shared/index";
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';

@Component({
    selector: 'sd-jardin',
    templateUrl: 'app/+jardin/components/jardin.component.html',
    styleUrls: ['app/+jardin/components/jardin.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class JardinComponent {
    newName:string;
    id:String;

    constructor(
        public nameListService:NameListService,
        private _router:Router,
        private _routeParams:RouteParams){}
    
    ngOnInit() {
        this.id = this._routeParams.get('id');
    }

}
