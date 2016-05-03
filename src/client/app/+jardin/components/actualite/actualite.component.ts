import {Component, Input,Output,EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {ActualiteService, Actualite} from "../../../shared/index";
import {NomUtilisateurComponent} from "../nom-utilisateur/nom-utilsateur.component";
import {AvatarUtilisateurComponent} from "../avatar-utilisateur/avatar-utilsateur.component";
import {AuthService} from "../../../shared/services/auth.service";
import {Jardin} from "../../../shared/services/interfaces";


@Component({
  selector: 'sd-actualitie',
  templateUrl: 'app/+jardin/components/actualite/actualite.component.html',
  styleUrls: ['app/+jardin/components/actualite/actualite.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, NomUtilisateurComponent, AvatarUtilisateurComponent],
  providers: [ActualiteService]
})


export class ActualiteComponent {
  constructor(private actualiteService:ActualiteService, private authService:AuthService) {
  }

  @Input() num:number;
  @Input() jardin:Jardin;

  @Output() deleteActualiteEvent = new EventEmitter<number>();

  errorMessage:string;
  actualite:Actualite;

  ngOnInit() {
    this.actualiteService.get(this.num)
      .subscribe(
        actualite => this.actualite = actualite,
        error => this.errorMessage = <any>error);
  }

  convertdate(date:string) {
    return new Date(date);
  }

  peutSupprimer() {
    return this.jardin.administrateurs.indexOf(this.authService.getId()) != -1 ;
  }

  deleteActualite(id) {
    this.deleteActualiteEvent.emit(id);
  }

}
