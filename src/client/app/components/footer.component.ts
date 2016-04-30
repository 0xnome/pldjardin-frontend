import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

@Component({
    selector: 'sd-footer',
    templateUrl: 'app/components/footer.component.html',
    directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class FooterComponent {
    constructor(private _router:Router) {}
}
/**
 * Created by Estelle on 30/04/2016.
 */
