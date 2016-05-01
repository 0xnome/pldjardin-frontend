import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {CarteService, AdresseService, JardinService, RechercheService} from "../../shared/index";
import 'jquery'
import {Map, Marker, LeafletLocationEvent, LeafletErrorEvent, LeafletMouseEvent} from 'leaflet'
import {Jardin, Adresse} from "../../shared/index";
import {AdresseComponent} from "../../+jardin/components/adresse/adresse.component";
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import 'lodash'
import 'leaflet.markercluster'
interface JardinMarker {
  idJardin:number;
  marker:Marker;
}


const DEFAULT_ZOOM = 14;
const MIN_ZOOM = 6;

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+carte/components/carte.component.html',
  styleUrls: ['app/+carte/components/carte.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, AdresseComponent, ROUTER_DIRECTIVES],
  providers: [AdresseService, RechercheService]
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
   * Jardin selectionné.
   */
  jardinSelectionne:Jardin;

  /**
   * Les id des jardins associés à leur marker sur la carte
   */
  jardinMarkers:JardinMarker[];

  /**
   * Pour la gestion des clusters
   */
  markersGroup:any;

  /**
   * La valeur de l'input
   */
  @Input() requeteRecherche:string;


  constructor(private _carteService:CarteService, private  _adresseService:AdresseService, private _jardinService:JardinService, private _rechercheService:RechercheService) {
    this.adressesJardin = [];
    this.jardinMarkers = [];
    //noinspection TypeScriptUnresolvedFunction
    this.markersGroup = L.markerClusterGroup();
  }

  ngOnInit() {
    this.setUpCarte();
    this.getJardins();
    //this.localiseUtilisateur();
  }

  /**
   * Callback appelé quand on clique sur un jardin dans la liste
   * @param jardin
   */
  public clicJardin(jardin:Jardin) {
    this.jardinSelectionne = jardin;
    this.panToJardin(jardin);
    setTimeout(()=> {
      if(this.carte.getZoom() < DEFAULT_ZOOM){
        this.carte.zoomIn(DEFAULT_ZOOM - this.carte.getZoom(), {animate : true});
      }
      this.openPopUp(jardin);
    }, 1000);
  }

  private getMarkerByJardinId(jardinId:number):Marker {
    for (i = 0; i < this.jardinMarkers.length; i++) {
      let jardinMarkerCourant = this.jardinMarkers[i];
      if (jardinMarkerCourant.idJardin == jardinId) {
          return jardinMarkerCourant.marker;
      }
    }

    return undefined;
  }

  /**
   * Ouvre le popup associé au jardin passé en paramètre
   * @param jardin
   */
  private openPopUp(jardin:Jardin) {
    let i:number;
    for (i = 0; i < this.jardinMarkers.length; i++) {
      let jardinMarkerCourant = this.jardinMarkers[i];
      if (jardinMarkerCourant.idJardin == jardin.id) {
        jardinMarkerCourant.marker.openPopup();
      }
    }
  }


  /**
   * Bouge la carte vers un jardin
   * @param jardin
   */
  private panToJardin(jardin:Jardin) {
    let i:number;
    for (i = 0; i < this.adressesJardin.length; i++) {

      let adresseCourante = this.adressesJardin[i];

      if (adresseCourante.id == jardin.adresse) {
        this.carte.panTo([+adresseCourante.lat, +adresseCourante.long], {animate: true, duration: 0.8});
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

  /**
   * Met en place les markers
   */
  private setUpmarkers() {
    let i:number;
    let icon = new CarteService.LeafIcon({iconUrl: 'assets/img/leaf-green.png'});
    for (i = 0; i < this.jardins.length; i++) {
      let jardinCourant = this.jardins[i];

      this._adresseService.get(jardinCourant.adresse).subscribe(adresse => {
        this.adressesJardin.push(adresse); // ajout de l'adresse dans la liste des adresses

        let marker = L.marker([+adresse.lat, +adresse.long], {
          icon: icon,
          riseOnHover: true
        }).bindPopup(jardinCourant.nom);

        this.markersGroup.addLayer(marker);

        //noinspection TypeScriptUnresolvedVariable
        marker.id = jardinCourant.id;

        let jardinMarker = {
          idJardin: jardinCourant.id,
          marker: marker
        };


        this.setMarkerClickEvent(jardinMarker.marker);
        this.jardinMarkers.push(jardinMarker);

      }, error => {
        console.log(error);
      })
    }

    this.carte.addLayer(this.markersGroup);
  }

  private setMarkerClickEvent(marker:Marker) {
    marker.on('click', (mouseEvent:LeafletMouseEvent) => {
      this.setJardinSelectionneById(mouseEvent.target.id);
    });
  }

  private setJardinSelectionneById(id:number) {
    for (let i = 0; i < this.jardins.length; i++) {
      if (this.jardins[i].id == id) {
        this.jardinSelectionne = this.jardins[i];
      }
    }
  }

  private localiseUtilisateur() {
    this.carte.locate({setView: true, watch: false, maxZoom: 14}) /* This will return carte so you can do chaining */
      .on('locationfound', (e:LeafletLocationEvent) => {
        L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.carte).bindPopup('Votre position').openPopup();
        L.circle([e.latlng.lat, e.latlng.lng], e.accuracy / 2, {
          weight: 1,
          color: 'blue',
          fillColor: '#cacaca',
          fillOpacity: 0.3
        }).addTo(this.carte);
      })
      .on('locationerror', (e:LeafletErrorEvent) => {
        console.log(e);
      });
  }

  /**
   * Astuce pour fixer la taille de la liste des jardins affichés
   * @returns {number} : hauteur de liste
   */
  public getHeight() {
    let top = document.getElementById("listJardin").getBoundingClientRect().top;

    let mapBoundindClientRect = document.getElementById("mapid").getBoundingClientRect();

    let heightCarte = mapBoundindClientRect.height;
    let topCarte = mapBoundindClientRect.top;
    return heightCarte + topCarte - top;
  }

  /**
   * Met en place la carte
   */
  private setUpCarte() {
    this.carte = L.map('mapid', {
      center: CarteService.LYON_LAT_LONG,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      minZoom: MIN_ZOOM,
      layers: [this._carteService.baseMaps.OpenStreetMap],
      maxBounds: CarteService.bounds
    });


    L.control.zoom({position: 'topright'}).addTo(this.carte);
    L.control.layers(this._carteService.baseMaps).addTo(this.carte);
    L.control.scale().addTo(this.carte);

    // workaround pour fixer la map qui ne s'affichait pas quand on changeait de page.
    this.carte.removeLayer(this._carteService.baseMaps.OpenStreetMap);
    this.carte.addLayer(this._carteService.baseMaps.OpenStreetMap);

    // TODO : Utiliser throttled

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

  recherche() {
    if (this.requeteRecherche) {
      this._rechercheService.recherche(this.requeteRecherche).subscribe(reponseRecherche => {
        console.log(reponseRecherche);
      }, error => {
        console.log(error);
      });
    }
  }

}
