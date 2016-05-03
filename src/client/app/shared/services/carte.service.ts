import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import {Map, TileLayer} from 'leaflet';
import {LatLngBounds} from 'leaflet';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import LatLng = L.LatLng;
import {Observable} from "rxjs/Observable";
import {UtilService} from "./util.service";

interface ILatLng {
  latitude:number;
  longitude:number;
}

export class Location implements ILatLng {
  latitude:number;
  longitude:number;
  addressString:string;
  viewBounds:LatLngBounds;
}

@Injectable()
export class CarteService {


  /**
   * Liste des fournisseurs de maps
   */
  baseMaps:any;

  /**
   * Coordonnées gps centrée sur Lyon
   * @type {LatLng}
   */
  static LYON_LAT_LONG = L.latLng(45.750149, 4.830999);

  static SUD_OUEST_FRANCE = L.latLng(42.0744476, -0.2576808);
  static NORD_EST_FRANCE = L.latLng(51.6644529, 6.2226451);
  static bounds = L.latLngBounds(CarteService.SUD_OUEST_FRANCE, CarteService.NORD_EST_FRANCE);

  static LeafIcon = L.Icon.extend({
    options: {
      shadowUrl: 'assets/img/leaf-shadow.png',
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76]
    }
  });

  /**
   * Access token pour MapBox
   * @type {string}
   */
  static ACCESS_TOKEN = "pk.eyJ1IjoiZWxtaGFpZGFyYSIsImEiOiJjaW5pbXBjdjEwMDRidnNrbDJ4N2NoMG5iIn0.QF5aeo-TKr0Vw_J93gwx1A";
  //ACCESS_TOKEN = "pk.eyJ1IjoiZWxtaGFpZGFyYSIsImEiOiJjaW5pbWR1N2IwMDNpd2RrbDkwdG54cHA0In0._aA0YH47bLr7ls4AM_LrlQ";


  constructor(private http:Http) {
    this.baseMaps = {
      OpenStreetMap: new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
      }),
      MapBoxStreets: new L.TileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: CarteService.ACCESS_TOKEN
      }),
      MapBoxSatelliteSatellite: new L.TileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets-satellite',
        accessToken: CarteService.ACCESS_TOKEN
      })
    };
  }

  geoCode(address:string) :Observable<any> {
    return this.http
      .get('http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address))
      .map(UtilService.extractData)
      .catch(UtilService.handleError)
  }


  static parseGeoCodeResponse(response:any):Location {
    //noinspection TypeScriptUnresolvedVariable
    if (response.status != 'OK') {
      throw new Error('unable to geocode address');
    }

    var location = new Location();
    //noinspection TypeScriptUnresolvedVariable
    location.addressString = response.results[0].formatted_address;
    //noinspection TypeScriptUnresolvedVariable
    location.latitude = response.results[0].geometry.location.lat;
    //noinspection TypeScriptUnresolvedVariable
    location.longitude = response.results[0].geometry.location.lng;
    //noinspection TypeScriptUnresolvedVariable
    var viewPort = response.results[0].geometry.viewport;
    location.viewBounds = new LatLngBounds(
      {
        lat: viewPort.southwest.lat,
        lng: viewPort.southwest.lng
      },
      {
        lat: viewPort.northeast.lat,
        lng: viewPort.northeast.lng
      });

    return location;
  }

}
