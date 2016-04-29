"use strict";
import {Component, Output, EventEmitter} from "angular2/core";

@Component({
    selector: "autocomplete-list",
    template: `<div class="search-results center-block">
                    <div class="media result" *ngFor="#item of list" (click)="onClick(item)">
                      <div class="media-left  media-middle">
                        <a href="#">
                          <img class="media-object" style="width: 50px; height: 50px"
                          src="http://www.jardinier-amateur.fr/images/parcsjardins/1125_le_jardin_d_astree_haverskerque-l50-h50-c.jpeg" alt="...">
                        </a>
                      </div>
                      <div class="media-body" style="text-align: left">
                        <h4  class="media-heading" >{{item.text}}</h4>
                        {{item.data.description | slice:0:125}} <span *ngIf="item.data.description.length > 125">...</span>
                      </div>
                    </div>
               </div>`,
    styleUrls: ['app/+home/ng2-autocomplete/autocomplete.css'],
})
export class AutocompleteList {
    @Output() public selected = new EventEmitter();

    public list;

    public onClick(item:{text:string, data:any}) {
        this.selected.emit(item);
    }
}
