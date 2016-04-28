import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {NameListService, JardinService, AuthService, CarteService} from '../shared/index';
import {HomeComponent} from '../+home/index';
import {CarteComponent} from '../+carte/index';
import {AboutComponent} from '../+about/index';
import {JardinComponent} from '../+jardin/index';
import {FicheLopinComponent} from '../+fiche_lopin/index';
import {UtilisateurComponent} from '../+utilisateur/index';
import {Modal} from "angular2-modal";

@Component({
    selector: 'sd-app',
    viewProviders: [NameListService, JardinService, AuthService, Modal, CarteService],
    templateUrl: 'app/components/app.component.html',
    directives: [ROUTER_DIRECTIVES, NavbarComponent]
})

@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent},
    {path: '/carte', name: 'Carte', component: CarteComponent},
    {path: '/jardin/:id', name: 'Jardin', component: JardinComponent},
    {path: '/utilisateur/:id', name: 'Utilisateur', component: UtilisateurComponent},
    {path: '/lopin/:id', name: 'Utilisateur', component: FicheLopinComponent},
    {path: '/about', name: 'About', component: AboutComponent}
])
export class AppComponent {}
