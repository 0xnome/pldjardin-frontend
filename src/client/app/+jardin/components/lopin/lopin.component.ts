import {Component, Input} from 'angular2/core';
import {FORM_DIRECTIVES, CORE_DIRECTIVES} from "angular2/common";
import {RouteParams, Router} from 'angular2/router';
import {LopinService} from "../../../shared/index";
import {Lopin} from "../../../shared/index";

@Component({
  selector: 'sd-lopin',
  templateUrl: 'app/+jardin/components/lopin/lopin.component.html',
  styleUrls: ['app/+jardin/components/lopin/lopin.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [LopinService]
})
export class LopinComponent {

  constructor(private lopinService:LopinService) {}

  @Input() num:number;

  errorMessage:string;
  lopin:Lopin;

  ngOnInit() {
    this.lopinService.get(this.num)
      .subscribe(
        lopin => this.lopin = lopin,
        error => this.errorMessage = <any>error);
  }

  convertdate(date:string) {
    return new Date(date);
  }

}
