import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {CommentaireJardinService} from "../../../shared/index";
import {CommentaireJardin} from "../../../shared/index";

@Component({
  selector: 'sd-commentaire',
  templateUrl: 'app/+jardin/components/commentaire/commentaire.component.html',
  styleUrls: ['app/+jardin/components/commentaire/commentaire.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [CommentaireJardinService]
})
export class CommentaireComponent {

  constructor(private commentaireJardinService:CommentaireJardinService) {
  }

  @Input() num:number;

  errorMessage:string;
  commentaireJardin : CommentaireJardin;

  ngOnInit() {
    this.commentaireJardinService.get(this.num)
      .subscribe(
        commentaireJardin => this.commentaireJardin = commentaireJardin,
        error => this.errorMessage = <any>error);
  }

  convertdate(date:string) {
    return new Date(date);
  }

}
