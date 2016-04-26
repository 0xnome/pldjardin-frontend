import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router}              from 'angular2/router';

import {ROUTER_DIRECTIVES} from "angular2/router";


@Component({
    selector: 'sd-home',
    templateUrl: 'app/+home/components/home.component.html',
    styleUrls: ['app/+home/components/home.component.css'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]

})
export class HomeComponent {
    id:string = '2';

    constructor(private _router:Router){}

    getJardin() {
        this._router.navigate(['Jardin', {id: this.id}]);
    }

}
