import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import 'leaflet'


@Component({
  selector: 'sd-home',
  templateUrl: 'app/+carte/components/carte.component.html',
  styleUrls: ['app/+carte/components/carte.component.css', 'app/+carte/components/leaflet.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})


export class CarteComponent {

  ACCESS_TOKEN = "pk.eyJ1IjoiZWxtaGFpZGFyYSIsImEiOiJjaW5pbXBjdjEwMDRidnNrbDJ4N2NoMG5iIn0.QF5aeo-TKr0Vw_J93gwx1A";
  //ACCESS_TOKEN = "pk.eyJ1IjoiZWxtaGFpZGFyYSIsImEiOiJjaW5pbWR1N2IwMDNpd2RrbDkwdG54cHA0In0._aA0YH47bLr7ls4AM_LrlQ";

  ngOnInit() {

    var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: this.ACCESS_TOKEN
    }).addTo(mymap);
  }

  getMapHeight() {
    // TODO à completer
    return window.innerHeight-53;
  }

}


