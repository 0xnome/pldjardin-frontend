/// <reference path="leaflet.d.ts" />

import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';


@Component({
  selector: 'sd-home',
  templateUrl: 'app/+carte/components/carte.component.html',
  styleUrls: ['app/+carte/components/carte.component.css', 'app/+carte/components/leaflet.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})


export class CarteComponent {

  ACCES_TOKEN = "pk.eyJ1IjoiZWxtaGFpZGFyYSIsImEiOiJjaW5pbXBjdjEwMDRidnNrbDJ4N2NoMG5iIn0.QF5aeo-TKr0Vw_J93gwx1A";

  ngOnInit() {
    var mymap = L.map('mapid').setView([51.505, -0.09], 5);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'smartgarden',
      accessToken: this.ACCES_TOKEN
    }).addTo(mymap);
  }
}
