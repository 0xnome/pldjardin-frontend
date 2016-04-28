import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {CarteService} from "../../shared/index";
import 'leaflet'


@Component({
  selector: 'sd-home',
  templateUrl: 'app/+carte/components/carte.component.html',
  styleUrls: ['app/+carte/components/carte.component.css', 'app/+carte/components/leaflet.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})


export class CarteComponent {
  
  constructor(private carteService : CarteService){}

  ngOnInit() {
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    this.carteService.baseMaps.MapBoxStreets.addTo(mymap);
  }

  getMapHeight() {
    // TODO à completer
    return window.innerHeight-53;
  }

}


