import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
/*import {Http, HTTP_PROVIDERS} from 'angular2/http';*/

@Component({
    selector: 'sd-utilisateur',
    templateUrl: 'app/+utilisateur/components/utilisateur.component.html',
    styleUrls: ['app/+utilisateur/components/utilisateur.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class UtilisateurComponent {
    id:String;

    //utilisateur_vrai;
    utilisateur = {
        avatar: 'https://framapic.org/yt7XXrlqyPrR/ZkRby5eiKZv3.jpg',
        nom: 'Samantha Lenoir',
        desc: 'Bonjour à tous ! Artiste dans l âme, j adore jardiner ! J aime planter des pétunias et des violettes carnivores dans les jardinières de mon balcon, j ai moins de mouches dans la maison comme ça. A bientôt !'
    }

    constructor(
        private _router:Router,
        private _routeParams:RouteParams){

    }
    
    ngOnInit() {
        this.id = this._routeParams.get('id');
                    
        /*url:String = 'https://backend-jardins-hverlin.c9users.io/utilisateurs/2/';
        http.get(url)
            // Call map on the response observable to get the parsed people object
            .map(res => res.json())
            // Subscribe to the observable to get the parsed people object and attach it to the
            // component
            .subscribe(utilisateur_vrai => this.utilisateur_vrai = utilisateur_vrai);*/
    }

}
