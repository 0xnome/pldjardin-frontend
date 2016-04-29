import {Component, provide, Injector} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AuthService} from "../../shared/index";

import {Http, HTTP_PROVIDERS} from "angular2/http";

import {AutocompleteDirective} from "../ng2-autocomplete/autocomplete";
import "rxjs/Rx";


@Component({
    selector: 'sd-home',
    templateUrl: 'app/+home/components/home.component.html',
    styleUrls: ['app/+home/components/home.component.css'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, AutocompleteDirective],
    providers: [AuthService]
})

export class HomeComponent {
    id:string = '2';
    connecte:boolean = false;
    public countryName = "";
    searchInProgress;

    constructor(private _router:Router, private _authService:AuthService,
                private http: Http) {}


    ngOnInit() {}

    getJardin() {
        this._router.navigate(['Utilisateur', {id: this._authService.getId()}]);
    }

    connexion() {
        this._authService.openConnexionModal();
    }

    inscription() {
        this._authService.openInscriptionModal();
    }

    ngOnInit() {
        if (AuthService.authenticated()) {
            this.connecte = true;
        }
    }

    isConnected() {
        return AuthService.authenticated()
    }

    public serachCountry() {
        return (filter: string): Promise<Array<{ text: string, data: any }>> => {
            return new Promise<Array<{ text: string, data: any }>>((resolve, reject) => {
                this.http.get("http://localhost:8000/recherche/")
                    .map(res => res.json().jardins)
                    .map(result => result.map(jardin => {
                        return {text: jardin.nom, data: jardin};
                    }))
                    .subscribe(
                        results => resolve(results),
                        err => reject(err)
                    );
            });
        };
    }

    public onCountrySelected(selected: { text: string, data: any }) {
        this.countryName = selected.text;
        this._router.navigate(['Jardin', {id: selected.data.id}]);
    }

}
