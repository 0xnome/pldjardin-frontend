import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {CarteService} from "../../shared/index";
import 'jquery'
import {Map} from 'leaflet'
import {JardinService} from "../../shared/index";
import {Jardin} from "../../shared/index";
import {AdresseComponent} from "../../+jardin/components/adresse/adresse.component";
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import 'lodash'

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+carte/components/carte.component.html',
  styleUrls: ['app/+carte/components/carte.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, AdresseComponent, ROUTER_DIRECTIVES]
})


export class CarteComponent {

  /**
   * Instance représentant la map
   */
  carte:Map;


  /**
   * Liste des jardins
   */
  jardins:Jardin[];


  jardinSelectionne:Jardin;

  constructor(private _carteService:CarteService, private _jardinService:JardinService) {
  }

  ngOnInit() {
    this.configCarte();
    this.getJardins();
  }

  /**
   * Recupère la liste des jardins
   */
  getJardins() {
    this._jardinService.getList().subscribe(jardins => this.jardins = jardins);
  }

  /**
   * Astuce pour fixer la taille de la liste des jardins affichés
   * @returns {number} : hauteur de liste
   */
  getHeight() {
    let top = document.getElementById("listJardin").getBoundingClientRect().top;

    let mapBoundindClientRect = document.getElementById("mapid").getBoundingClientRect();

    let heightCarte = mapBoundindClientRect.height;
    let topCarte = mapBoundindClientRect.top;
    return heightCarte + topCarte - top;
  }

  configCarte() {
    this.carte = L.map('mapid', {
      center: CarteService.LYON_LAT_LONG,
      zoom: 14,
      zoomControl: false,
      layers: [this._carteService.baseMaps.OpenStreetMap]
    });


    L.control.zoom({ position: 'topright' }).addTo(this.carte);
    L.control.layers(this._carteService.baseMaps).addTo(this.carte);
    L.control.scale().addTo(this.carte);


    /*let currentCarte = this.carte;

    var resizeFunction = function() {
      $("#mapid").height($(window).height() - 90);
      currentCarte.invalidateSize(false);
    };

    var throttled = _.throttle(resizeFunction, 100);

    $(window).on('resize', throttled).trigger('resize'); */


    $(window).on("resize", () => {
      $("#mapid").height($(window).height() - 90);
      this.carte.invalidateSize(false);
    }).trigger("resize");

  }

}
