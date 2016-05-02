import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {CarteService, AdresseService, JardinService, RechercheService} from "../../shared/index";
import 'jquery'
import {Map, Marker, LeafletLocationEvent, LeafletErrorEvent, LeafletMouseEvent, LeafletEvent} from 'leaflet'
import {Jardin, Adresse, Lopin, ReponseRecherche} from "../../shared/index";
import {AdresseComponent} from "../../+jardin/components/adresse/adresse.component";
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import 'lodash'
import 'leaflet.markercluster'
import {Config} from "../../shared/config";


/**
 * Cette interface assoicie un jardin avec son marker
 */
interface JardinMarker {
  idJardin:number;
  marker:Marker;
}

interface LopinMarker {
  idLopin:number;
  marker:Marker;
}


enum ElementType {
  JARDIN,
  LOPIN,
  PLANTE
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
   * Liste des adresses des jardins
   */
  adressesJardin:Adresse[];

  /**
   * Liste des adresses des lopins
   */
  adressesLopin:Adresse[];

  /**
   * Jardin selectionné.
   */
  jardinSelectionne:Jardin;

  /**
   * Lopin selectionné.
   */
  lopinSelectionne:Lopin;

  /**
   * Les id des jardins associés à leur marker sur la carte
   */
  jardinMarkers:JardinMarker[];

  /**
   * Les id des lopins associés à leur marker sur la carte
   */
  lopinsMarkers:LopinMarker[];


  /**
   * Pour la gestion des clusters
   */
  markersGroup:any;

  /**
   * La valeur de l'input
   */
  @Input() requeteRecherche:string;


  /**
   * Resultat de la recherche
   */
  resultatRecherche:ReponseRecherche;


  constructor(private _carteService:CarteService, private  _adresseService:AdresseService, private _jardinService:JardinService, private _rechercheService:RechercheService) {
    this.adressesJardin = [];
    this.jardinMarkers = [];
    this.lopinsMarkers = [];
    this.adressesLopin = [];
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
    this.lopinSelectionne = null;

    if (!this.hasZoomIn(jardin, ElementType.JARDIN)) {
      this.panToElement(jardin.id, jardin.adresse, ElementType.JARDIN);
    }
  }

  public clicLopin(lopin:Lopin) {
    this.lopinSelectionne = lopin;
    this.jardinSelectionne = null;

    if (!this.hasZoomIn(lopin, ElementType.LOPIN)) {
      this.panToElement(lopin.id, lopin.adresse, ElementType.LOPIN);
    }
  }

  private hasZoomIn(elment:any, elementType:ElementType):boolean {
    if (this.carte.getZoom() < DEFAULT_ZOOM - ZOOM_OFFSET) {
      // si on a dezoomé, on va zoomer et faire le pan à la fin du zoom
      if (elementType == ElementType.JARDIN) {
        //noinspection TypeScriptUnresolvedVariable
        this.carte._current_jardin_ = elment;
      } else if (elementType == ElementType.LOPIN) {
        //noinspection TypeScriptUnresolvedVariable
        this.carte._current_lopin_ = element;
      }
      this.carte.zoomIn(DEFAULT_ZOOM - this.carte.getZoom(), {animate: true});

      return true;
    } else {
      return false;
    }
  }


  private getMarkerByLopinId(lopinId:number):Marker {
    let i;
    for (i = 0; i < this.lopinsMarkers.length; i++) {
      let jardinMarkerCourant = this.lopinsMarkers[i];
      if (jardinMarkerCourant.idLopin == lopinId) {
        return jardinMarkerCourant.marker;
      }
    }
    return undefined;
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

  private panToElement(elmentId:number, elementAdresseId:number, elementype:ElementType) {

    let elementArray:any;

    if (elementype === ElementType.JARDIN) {
      elementArray = this.adressesJardin;
    } else if (elementype === ElementType.LOPIN) {
      elementArray = this.adressesLopin;
    }

    for (let i = 0; i < elementArray.length; i++) {

      let adresseCourante = elementArray[i];

      if (adresseCourante.id == elementAdresseId) {

        if (elementype == ElementType.JARDIN) {
          //noinspection TypeScriptUnresolvedVariable
          this.carte._currentMarker_ = this.getMarkerByJardinId(elmentId);
        } else if (elementype == ElementType.LOPIN) {
          //noinspection TypeScriptUnresolvedVariable
          this.carte._currentMarker_ = this.getMarkerByLopinId(elmentId);
        }
        this.carte.panTo([+adresseCourante.lat, +adresseCourante.long], {animate: true});
        return;
      }
    }
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
        //noinspection TypeScriptUnresolvedVariable
        marker._jardin_ = "jardin";

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


    // config des lopins
    let iconLopin = new CarteService.LeafIcon({iconUrl: 'assets/img/leaf-red.png'});
    for (i = 0; i < this.resultatRecherche.lopins.length; i++) {
      let lopinCourant = this.resultatRecherche.lopins[i];

      this._adresseService.get(lopinCourant.adresse).subscribe(adresse => {
        this.adressesLopin.push(adresse); // ajout de l'adresse dans la liste des adresses

        let marker = L.marker([+adresse.lat, +adresse.long], {
          icon: iconLopin,
          riseOnHover: true
        }).bindPopup(lopinCourant.nom);

        this.markersGroup.addLayer(marker);

        //noinspection TypeScriptUnresolvedVariable
        marker._id_ = lopinCourant.id;
        //noinspection TypeScriptUnresolvedVariable
        marker._lopin_ = "lopin";

        let lopinMarker = {
          idLopin: lopinCourant.id,
          marker: marker
        };


        this.setMarkerClickEvent(lopinMarker.marker);
        this.lopinsMarkers.push(lopinMarker);

      }, error => {
        console.log(error);
      })
    }
  }

  private setMarkerClickEvent(marker:Marker) {
    marker.on('click', (mouseEvent:LeafletMouseEvent) => {

      if (mouseEvent.target._lopin_) {
        this.setLopinSelectionneById(mouseEvent.target._id_);
        this.jardinSelectionne = null;
      } else if (mouseEvent.target._jardin_) {

        this.setJardinSelectionneById(mouseEvent.target._id_);
        this.lopinSelectionne = null;
      }

    });
  }

  private setLopinSelectionneById(id:number) {
    for (let i = 0; i < this.resultatRecherche.lopins.length; i++) {
      if (this.resultatRecherche.lopins[i].id == id) {
        this.lopinSelectionne = this.resultatRecherche.lopins[i];
      }
    }
  }

  private setJardinSelectionneById(id:number) {
    for (let i = 0; i < this.resultatRecherche.jardins.length; i++) {
      if (this.resultatRecherche.jardins[i].id == id) {
        this.jardinSelectionne = this.resultatRecherche.jardins[i];
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
      if (event.target._current_jardin_ && this.jardinSelectionne.id === (<Jardin>event.target._current_jardin_).id) {
        //this.panToJardin(<Jardin>event.target._current_jardin);
        this.panToElement((<Jardin>event.target._current_jardin_).id, (<Jardin>event.target._current_jardin_).adresse, ElementType.JARDIN);
      } else if (event.target._current_lopin_) {
        this.panToElement((<Jardin>event.target._current_lopin_).id, (<Jardin>event.target._current_lopin_).adresse, ElementType.LOPIN);
      }
    });

  }

  /**
   * Supprime tous les markers
   */
  private resetMarkers() {
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
        this.resultatRecherche.lopins = this.resultatRecherche.lopins.filter(lopin => !lopin.jardin);
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
      this.resultatRecherche.lopins = this.resultatRecherche.lopins.filter(lopin => !lopin.jardin);
      this.resetMarkers();
      this.setUpmarkers();
    }, error => {
      console.log(error);
    });
  }

  getApiUrl(url:string) {
    return Config.getApiUrl(url);
  }

}
