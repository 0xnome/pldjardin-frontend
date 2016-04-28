import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap';
import {RouteParams, Router} from 'angular2/router';
import {LopinService} from "../../shared/index";
import {Lopin, Plante} from "../../shared/index";
/*import {Http, HTTP_PROVIDERS} from 'angular2/http';*/

@Component({
    selector: 'sd-fiche-lopin',
    templateUrl: 'app/+fiche_lopin/components/fiche_lopin.component.html',
    styleUrls: ['app/+fiche_lopin/components/fiche_lopin.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ACCORDION_DIRECTIVES],
    viewProviders: [LopinService]
})
export class FicheLopinComponent {
    id:number;
    lopin:Lopin;
    plantes: Plante[];
    errorMessage:string;

    constructor(
        private _router:Router,
        private lopinService:LopinService,
        private _routeParams:RouteParams){}

    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this.lopinService.get(this.id)
            .subscribe(
                lopin => this.lopin = lopin,
                error => this.errorMessage = <any>error);
        this.lopinService.getPlantesLopin(this.id)
            .subscribe(
                plantes => this.plantes = plantes);
    }

    versFicheJardin(id:number) {
      this._router.navigate(['Jardin', {id: id}]);
    }



}
