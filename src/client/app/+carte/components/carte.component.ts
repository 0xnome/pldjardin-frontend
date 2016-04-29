import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {CarteService} from "../../shared/index";
import {AdresseService} from "../../shared/index";
import 'jquery'
import {Map} from 'leaflet'
import {JardinService} from "../../shared/index";
import {Jardin, Adresse} from "../../shared/index";
import {AdresseComponent} from "../../+jardin/components/adresse/adresse.component";
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import 'lodash'

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+carte/components/carte.component.html',
  styleUrls: ['app/+carte/components/carte.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, AdresseComponent, ROUTER_DIRECTIVES],
  providers: [AdresseService]
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

  /**
   * Liste des adresses des jardins
   */
  adressesJardin:Adresse[];


  /**
   * Jardin selectionné. Undefined si aucun jardin selectionné
   */
  jardinSelectionne:Jardin;

  constructor(private _carteService:CarteService, private  _adresseService:AdresseService, private _jardinService:JardinService) {
    this.adressesJardin = [];
  }

  ngOnInit() {
    this.configCarte();
    this.getJardins();
  }

  public clicJardin(jardin:Jardin) {
    this.jardinSelectionne = jardin;
    this.panToJardin(jardin);
  }

  private panToJardin(jardin:Jardin) {
    let i:number;
    for (i = 0; i < this.adressesJardin.length; i++) {

      let adresseCourante = this.adressesJardin[i];

      if (adresseCourante.id == jardin.adresse) {
        this.carte.panTo([+adresseCourante.lat, +adresseCourante.long], {animate: true, duration : 0.5});
        return;
      }
    }
  }

  /**
   * Recupère la liste des jardins
   */
  private getJardins() {
    this._jardinService.getList().subscribe(jardins => {
      this.jardins = jardins;
      this.setUpmarkers();
    }, error => {
      console.log(error);
    });
  }

  private setUpmarkers() {
    let i:number;
    let icon = new CarteService.LeafIcon({iconUrl: 'assets/img/leaf-green.png'});
    for (i = 0; i < this.jardins.length; i++) {
      let jardinCourant = this.jardins[i];

      this._adresseService.get(jardinCourant.id).subscribe(adresse => {
        this.adressesJardin.push(adresse);
        L.marker([+adresse.lat, +adresse.long], {icon: icon}).addTo(this.carte).bindPopup(jardinCourant.nom);
      }, error => {
        console.log(error);
      })

    }
  }

  /**
   * Astuce pour fixer la taille de la liste des jardins affichés
   * @returns {number} : hauteur de liste
   */
  private getHeight() {
    let top = document.getElementById("listJardin").getBoundingClientRect().top;

    let mapBoundindClientRect = document.getElementById("mapid").getBoundingClientRect();

    let heightCarte = mapBoundindClientRect.height;
    let topCarte = mapBoundindClientRect.top;
    return heightCarte + topCarte - top;
  }

  private configCarte() {
    this.carte = L.map('mapid', {
      center: CarteService.LYON_LAT_LONG,
      zoom: 14,
      zoomControl: false,
      layers: [this._carteService.baseMaps.OpenStreetMap]
    });


    L.control.zoom({position: 'topright'}).addTo(this.carte);
    L.control.layers(this._carteService.baseMaps).addTo(this.carte);
    L.control.scale().addTo(this.carte);

    // workaround pour fixer la map qui ne s'affichait pas quand on changeait de page.
    this.carte.removeLayer(this._carteService.baseMaps.OpenStreetMap);
    this.carte.addLayer(this._carteService.baseMaps.OpenStreetMap);


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
