import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {CarteService, AdresseService, JardinService, RechercheService} from "../../shared/index";
import 'jquery'
import {Map, Marker, LeafletLocationEvent, LeafletErrorEvent, LeafletMouseEvent, LeafletEvent} from 'leaflet'
import {Jardin, Adresse} from "../../shared/index";
import {AdresseComponent} from "../../+jardin/components/adresse/adresse.component";
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import 'lodash'
import 'leaflet.markercluster'
import {ReponseRecherche} from "../../shared/services/interfaces";
import {Config} from "../../shared/config";
interface JardinMarker {
  idJardin:number;
  marker:Marker;
}


const DEFAULT_ZOOM = 14;
const MIN_ZOOM = 6;
const ZOOM_OFFSET = 2;

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


  resultatRecherche:ReponseRecherche;


  constructor(private _carteService:CarteService, private  _adresseService:AdresseService, private _jardinService:JardinService, private _rechercheService:RechercheService) {
    this.adressesJardin = [];
    this.jardinMarkers = [];
    //noinspection TypeScriptUnresolvedFunction
    this.markersGroup = L.markerClusterGroup();
  }

  ngOnInit() {
    this.setUpCarte();
    this.getAll();
    this.localiseUtilisateur();
  }

  /**
   * Callback appelé quand on clique sur un jardin dans la liste
   * @param jardin
   */
  public clicJardin(jardin:Jardin) {
    this.jardinSelectionne = jardin;

    if (this.carte.getZoom() < DEFAULT_ZOOM - ZOOM_OFFSET) {
      // si on a dezoomé, on va zoomer et faire le pan à la fin du zoom
      //noinspection TypeScriptUnresolvedVariable
      this.carte._current_jardin = jardin;
      this.carte.zoomIn(DEFAULT_ZOOM - this.carte.getZoom(), {animate: true});

    } else {
      this.panToJardin(jardin);
    }

  }

  private getMarkerByJardinId(jardinId:number):Marker {
    let i;
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

        //noinspection TypeScriptUnresolvedVariable
        this.carte._currentMarker_ = this.getMarkerByJardinId(jardin.id);
        this.carte.panTo([+adresseCourante.lat, +adresseCourante.long], {animate: true});
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

    // config des jardins
    for (i = 0; i < this.resultatRecherche.jardins.length; i++) {
      let jardinCourant = this.resultatRecherche.jardins[i];

      this._adresseService.get(jardinCourant.adresse).subscribe(adresse => {
        this.adressesJardin.push(adresse); // ajout de l'adresse dans la liste des adresses

        let marker = L.marker([+adresse.lat, +adresse.long], {
          icon: icon,
          riseOnHover: true
        }).bindPopup(jardinCourant.nom);

        this.markersGroup.addLayer(marker);

        //noinspection TypeScriptUnresolvedVariable
        marker._id_ = jardinCourant.id;

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
  }

  private setMarkerClickEvent(marker:Marker) {
    marker.on('click', (mouseEvent:LeafletMouseEvent) => {
      this.setJardinSelectionneById(mouseEvent.target._id_);
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


    // configuration des boutons sur la carte
    L.control.zoom({position: 'topright'}).addTo(this.carte);
    L.control.layers(this._carteService.baseMaps).addTo(this.carte);
    L.control.scale().addTo(this.carte);

    // workaround pour fixer la map qui ne s'affichait pas quand on changeait de page.
    this.carte.removeLayer(this._carteService.baseMaps.OpenStreetMap);
    this.carte.addLayer(this._carteService.baseMaps.OpenStreetMap);

    //
    this.carte.addLayer(this.markersGroup);


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

    // pour ouvrir automatique un popup à la fin d'un panto
    this.carte.on('moveend', (event:LeafletEvent) => {
      if (event.target._currentMarker_) {
        <Marker>event.target._currentMarker_.openPopup();
      }
    });


    this.carte.on('zoomend', (event:LeafletEvent) => {
      if (event.target._current_jardin && this.jardinSelectionne.id === (<Jardin>event.target._current_jardin).id) {
        this.panToJardin(<Jardin>event.target._current_jardin);
      }
    });

  }

  /**
   * Supprime tous les markers
   */
  private resetMarkers(){
    this.markersGroup.clearLayers();
    this.jardinMarkers = [];
  }

  /**
   * Effectue une recherche
   */
  recherche() {
    if (this.requeteRecherche) {
      this._rechercheService.recherche(this.requeteRecherche).subscribe(reponseRecherche => {
        this.resultatRecherche = reponseRecherche;
        // recuperation des lopins qui n'ont pas de jardins
        this.resultatRecherche.lopins = this.resultatRecherche.lopins.filter( lopin => !lopin.jardin);
        this.resetMarkers();
        this.setUpmarkers();
      }, error => {
        console.log(error);
      });
    } else {
      this.getAll();
    }
  }

  /**
   * Recupère toutes les données.
   */
  getAll() {
    this._rechercheService.getAll().subscribe(reponseRecherche => {
      this.resultatRecherche = reponseRecherche;
      // recuperation des lopins qui n'ont pas de jardins
      this.resultatRecherche.lopins = this.resultatRecherche.lopins.filter( lopin => !lopin.jardin);
      this.resetMarkers();
      this.setUpmarkers();
    }, error => {
      console.log(error);
    });
  }

  getApiUrl(url:string){
    return Config.getApiUrl(url);
  }

}
