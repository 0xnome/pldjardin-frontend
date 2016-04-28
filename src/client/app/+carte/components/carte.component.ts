import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {CarteService} from "../../shared/index";
import 'jquery'
import {Map} from 'leaflet'

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+carte/components/carte.component.html',
  styleUrls: ['app/+carte/components/carte.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})


export class CarteComponent {

  map:Map;

  constructor(private carteService:CarteService) {
  }

  ngOnInit() {
    this.map = L.map('mapid').setView([45.750149, 4.830999], 14.5);
    this.carteService.baseMaps.OpenStreetMap.addTo(this.map);

    $(window).on("resize", () => {
      $("#mapid").height($(window).height() - 90);
      this.map.invalidateSize(false);
    }).trigger("resize");

  }

}
