"use strict";
import {Directive, ElementRef, DynamicComponentLoader, Input, ComponentRef, Output, EventEmitter, OnInit} from "angular2/core";
import {Promise} from "es6-promise";
import {AutocompleteList} from "./autocomplete-list";

@Directive({
    selector: "[ng2-autocomplete]",
    host: {
        "(keyup)": "onKey($event)"
    }
})
export class AutocompleteDirective implements OnInit {
    @Input("ng2-autocomplete") public search: (term: string) => Promise<Array<{ text: string, data: any }>>;
    @Output("ng2AutocompleteOnSelect") public selected = new EventEmitter();

    private searchInProgress = false;
    private term = "";
    private listCmp: ComponentRef = undefined;
    private refreshTimer: any = undefined;
    private searchRequired = false;

    constructor(private el: ElementRef, private dcl: DynamicComponentLoader) { }

    public onKey(event: any) {
        if (!this.refreshTimer) {
            this.refreshTimer = setTimeout(
            () => {
                if (!this.searchInProgress) {
                    this.doSearch();
                } else {
                    this.searchRequired = true;
                }
            }, 200);
        }
        this.term = event.target.value;
        if (this.term === "" && this.listCmp) {
            this.removeList();
        }
    }

    public ngOnInit() {
        this.selected.subscribe(() => {
            this.removeList();
        });
    }

    private doSearch() {
        this.refreshTimer = undefined;
        if (this.search && this.term !== "") {
            this.searchInProgress = true;
            this.search(this.term)
            .then((res) => {
                this.searchInProgress = false;
                if (this.searchRequired) {
                    this.searchRequired = false;
                    this.doSearch();
                } else {
                    this.diplayList(res);
                }
            })
            .catch(err => {
                console.log("search error:", err);
                this.removeList();
            });
        }
    }

    private diplayList(list: Array<{ text: string, data: any }>) {
        if (!this.listCmp) {
            this.dcl.loadNextToLocation(AutocompleteList, this.el)
            .then(cmp => {
                this.listCmp = cmp;
                this.updateList(list);
                (<AutocompleteList>(this.listCmp.instance)).selected
                    .subscribe(selectedItem => {
                    this.selected.emit(selectedItem);
                });
            });
        } else {
            this.updateList(list);
        }
    }

    private updateList(list: Array<{ text: string, data: any }>) {
        if (this.listCmp) {
            (<AutocompleteList>(this.listCmp.instance)).list = list;
        }
    }

    private removeList() {
        this.searchInProgress = false;
        this.searchRequired = false;
        if (this.listCmp) {
            this.listCmp.dispose();
            this.listCmp = undefined;
        }
    }
}
