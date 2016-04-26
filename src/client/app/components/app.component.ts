import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {NameListService} from '../shared/index';
import {HomeComponent} from '../+home/index';
import {CarteComponent} from '../+carte/index';
import {AboutComponent} from '../+about/index';

@Component({
    selector: 'sd-app',
    viewProviders: [NameListService],
    templateUrl: 'app/components/app.component.html',
    directives: [ROUTER_DIRECTIVES, NavbarComponent]
})

@RouteConfig([
    {
        path: '/',
        name: 'Home',
        component: HomeComponent
    },
    {
        path: '/carte',
        name: 'Carte',
        component: CarteComponent
    },
    {
        path: '/about',
        name: 'About',
        component: AboutComponent
    }
])
export class AppComponent {
}
