import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {AuthService} from "../shared/index";

@Component({
    selector: 'sd-navbar',
    templateUrl: 'app/components/navbar.component.html',
    styleUrls: ['app/components/navbar.component.css'],
    directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class NavbarComponent {
    constructor(private _authService:AuthService) {}

    open:boolean = false;

}
