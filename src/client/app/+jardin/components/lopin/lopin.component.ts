import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {DROPDOWN_DIRECTIVES} from "ng2-bootstrap"
import {Router} from 'angular2/router';
import {LopinService} from "../../../shared/index";
import {Lopin} from "../../../shared/index";
import {ActionsService} from "../../../shared/services/actions.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
    selector: 'sd-lopin',
    templateUrl: 'app/+jardin/components/lopin/lopin.component.html',
    styleUrls: ['app/+jardin/components/lopin/lopin.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, DROPDOWN_DIRECTIVES],
    providers: [LopinService, ActionsService, AuthService]
})
export class LopinComponent {

    constructor(private _router:Router,
                private actionsService:ActionsService,
                private authService:AuthService,
                private lopinService:LopinService) {
    }

    @Input() num:number;

    public status:{isopen:boolean} = {isopen: false};
    lopin:Lopin;
    private typesActions;

    ngOnInit() {
        this.lopinService.get(this.num)
            .subscribe(
                lopin => this.lopin = lopin,
                error => console.log(error));

        this.getTypesAction();
    }

    convertdate(date:string) {
        return new Date(date);
    }

    versLopin(id:number) {
        this._router.navigate(['Lopin', {id: id}]);
    }


    getTypesAction() {
        //noinspection TypeScriptUnresolvedVariable
        this.actionsService.getTypesActions().subscribe(
            typesActions => this.typesActions = typesActions.types
        )
    }

    addActionLopin(action:string) {
        this.lopinService.getPlantesLopin(this.lopin.id)
            .subscribe(
                plantes =>
                {
                    for (var plante of plantes) {
                        this.actionsService.addAction(plante.id, action).subscribe(
                            typesActions => {}
                        )
                    }
                });

    }
    
    peutFaireAction(){
        return this.authService.getId()
    }

}
