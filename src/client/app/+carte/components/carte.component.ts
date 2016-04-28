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

  /**
   * Instance représentant la map
   */
  map:Map;

  constructor(private carteService:CarteService) {
  }

  ngOnInit() {
    this.map = L.map('mapid', {
      center : CarteService.LYON_LAT_LONG,
      zoom : 14,
      zoomControl: false,
      layers : [this.carteService.baseMaps.OpenStreetMap]
    });


    L.control.zoom({ position: 'topright' }).addTo(this.map);
    L.control.layers(this.carteService.baseMaps).addTo(this.map);
    L.control.scale().addTo(this.map);

    $(window).on("resize", () => {
      $("#mapid").height($(window).height() - 90);
      this.map.invalidateSize(false);
    }).trigger("resize");

  }

}
