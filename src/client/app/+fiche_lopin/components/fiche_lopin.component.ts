import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {LopinService, CommentaireLopinService} from "../../shared/index";
import {Lopin, Plante, CommentaireLopin} from "../../shared/index";
import {PlanteComponent} from './plante/plante.component';
import {CommentaireLopinComponent} from './commentaire-lopin/commentaire-lopin.component';
/*import {Http, HTTP_PROVIDERS} from 'angular2/http';*/

import "jquery.qrcode"
import "jquery"

declare var pdfmake:any;

@Component({
    selector: 'sd-fiche-lopin',
    templateUrl: 'app/+fiche_lopin/components/fiche_lopin.component.html',
    styleUrls: ['app/+fiche_lopin/components/fiche_lopin.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, CommentaireLopinComponent, PlanteComponent],
    viewProviders: [LopinService]
})

export class FicheLopinComponent {
    id:number;
    lopin:Lopin;
    plantes:Plante[];
    commentairesLopin: CommentaireLopin[];
    errorMessage:string;

    constructor(private _router:Router,
                private lopinService:LopinService,
                private _routeParams:RouteParams) {
    }

    ngOnInit() {
        this.id = +this._routeParams.get('id');
        this.lopinService.get(this.id)
            .subscribe(
                lopin => this.lopin = lopin,
                error => this.errorMessage = <any>error);
        this.lopinService.getPlantesLopin(this.id)
            .subscribe(
                plantes => this.plantes = plantes);
        this.lopinService.getCommentairesLopin(this.id)
            .subscribe(
                commentairesLopin => this.commentairesLopin = commentairesLopin);
    }

    versFicheJardin(id:number) {
        this._router.navigate(['Jardin', {id: id}]);
    }

    getQrCode() {
        var qrDiv = $('#qrcode');
        qrDiv.qrcode(window.location.href);
        //noinspection TypeScriptUnresolvedFunction
        var qr = qrDiv.children().first()[0].toDataURL();

        var docDefinition = {
            // a string or { width: number, height: number }
            pageSize: 'A6',

            // by default we use portrait, you can change it to landscape if you wish
            pageOrientation: 'landscape',

            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
            pageMargins: [20, 20, 20, 20],
            content: [
                {
                    columns: [
                        {
                            stack: [
                                {
                                    image: qr,
                                    width: 150,
                                    height: 150,
                                    margin: [0, 20]
                                },
                                {
                                    text: window.location.href,
                                    margin: [10, 10],
                                    fontSize: 10,
                                    italics: true
                                },
                            ]
                        },

                        {
                            stack: [
                                {
                                    text : 'Ceci est un lopin partagé\nScanne moi ! ',
                                    margin: [0, 100],
                                }

                            ],
                            fontSize: 15
                        }
                    ]
                },

            ]
        };

        //noinspection TypeScriptUnresolvedVariable
        pdfMake.createPdf(docDefinition).open();
        qrDiv.empty();

    }


}
