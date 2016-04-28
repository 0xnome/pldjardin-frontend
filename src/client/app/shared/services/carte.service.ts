import {Injectable} from 'angular2/core';
import {Map, TileLayer} from 'leaflet';


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

  /**
   * Access token pour MapBox
   * @type {string}
     */
  static ACCESS_TOKEN = "pk.eyJ1IjoiZWxtaGFpZGFyYSIsImEiOiJjaW5pbXBjdjEwMDRidnNrbDJ4N2NoMG5iIn0.QF5aeo-TKr0Vw_J93gwx1A";
  //ACCESS_TOKEN = "pk.eyJ1IjoiZWxtaGFpZGFyYSIsImEiOiJjaW5pbWR1N2IwMDNpd2RrbDkwdG54cHA0In0._aA0YH47bLr7ls4AM_LrlQ";


  constructor() {
    this.baseMaps = {
      OpenStreetMap: new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
      }),
      Esri: new L.TileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
      }),
      CartoDB: new L.TileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      }),
      MapBoxStreets: new L.TileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: CarteService.ACCESS_TOKEN
      }),
    };
  }
  
}
