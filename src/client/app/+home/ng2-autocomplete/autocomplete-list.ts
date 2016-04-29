"use strict";
import {Component, Output, EventEmitter} from "angular2/core";

@Component({
    selector: "autocomplete-list",
    template: `<div class="search-results center-block">
                    <div class="media result" *ngFor="#item of list" (click)="onClick(item)">
                      <div class="media-left  media-middle">
                          <img *ngIf="item.data.type == 'jardin' " class="media-object" style="width: 50px; height: 50px" src="/assets/img/leaf-green.png" alt="...">
                          <img *ngIf="item.data.type == 'plante' " class="media-object" style="width: 50px; height: 50px" src="/assets/img/leaf-orange.png" alt="...">
                          <img *ngIf="item.data.type == 'lopin' " class="media-object" style="width: 50px; height: 50px" src="/assets/img/leaf-red.png" alt="...">
                          <img *ngIf="item.data.type == 'noresult' " class="media-object" style="width: 50px; height: 50px" src="/assets/img/arbre_triste.jpg" alt="...">
                      </div>
                      <div class="media-body" style="text-align: left">
                        <h4  class="media-heading" [innerHTML]="item.text" ></h4>
                        {{item.data?.texte | slice:0:125}} <span *ngIf="item.data?.texte.length > 125">...</span>
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
