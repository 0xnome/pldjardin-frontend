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
    public request = "";
    searchInProgress;

    constructor(private _router:Router, private _authService:AuthService,
                private http:Http) {
    }


    ngOnInit() {
    }

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

    public search() {
        var regex = RegExp(this.request, 'gi');
        return (filter:string):Promise<Array<{ text:string, data:any }>> => {
            return new Promise<Array<{ text:string, data:any }>>((resolve, reject) => {
                this.http.get("http://localhost:8000/recherche?q=" + this.request)
                    .map(res => this.ConcateneResultats(res.json()))
                    .map(result => result.map(result => {
                        return {
                            text: result.titre.replace(regex, '<strong>' + this.request + '</strong>'),
                            data: result
                        };
                    }))
                    .subscribe(
                        results => resolve(results),
                        err => reject(err)
                    );
            });
        };
    }

    ConcateneResultats(res) {
        let results = [];

        let jardins = res.jardins;
        // let adresses = res.adresses;
        let lopins = res.lopins;
        let plantes = res.plantes;


        jardins.map(jardin => results.push({
            "titre": jardin.nom,
            "texte": jardin.description,
            "id": jardin.id,
            "type": "jardin"
        }));
        lopins.map(lopin => results.push({
            "titre": lopin.nom,
            "texte": lopin.description,
            "id": lopin.id,
            "type": "lopin"
        }));
        plantes.map(plante => results.push({
            "titre": plante.nom + ' - ' + plante.espece,
            "texte": plante.description,
            "id": plante.lopin,
            "type": "plante"
        }));

        
/*        adresses.map(adresse => results.push({
            "titre": adresse.rue,
            "texte": adresse.rue,
            "id": adresse.id,
            "type": "adresse"
        }));*/
        
        if (results.length == 0){
            results.push({
                "titre": "Pas de résultats",
                "texte": "Malgré tous nos efforts, nous n'avons rien pu trouver !",
                "type": "noresult"
            })
        }

        return results

    }

    public onCountrySelected(selected:{ text:string, data:any }) {
        if(selected.data.type == "jardin"){
            this._router.navigate(['Jardin', {id: selected.data.id}]);
        }
        if(selected.data.type == "lopin"){
            this._router.navigate(['Lopin', {id: selected.data.id}]);
        }
        if(selected.data.type == "plante"){
            this._router.navigate(['Lopin', {id: selected.data.id}]);
        }
    }
}
