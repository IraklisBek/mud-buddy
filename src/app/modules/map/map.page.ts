import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { Building } from 'src/app/core/models/building.model';
import { Marker } from 'src/app/core/models/map.model';
import { BuildingService } from 'src/app/core/services/building.service';
import { BuildingComponent } from '../shared/modals/building/building.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {
  public buildings = this.buildingService.dummyBuildings;
  public markers: Marker[] = [];
  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    disableDoubleClickZoom: true,
  }
  lat: number = 0;
  lng: number = 0;
  constructor(
    private buildingService: BuildingService,
    private geolocation: Geolocation,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.createMarkers();
    this.getUserLocation();
  }

  private getUserLocation() {
    this.geolocation.getCurrentPosition().then((res) => {
      this.center = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  createMarkers() {
    for (let building of this.buildings) {
      let marker: Marker = {
        position: {
          lat: building.lat,
          lng: building.lng,
        },
        label: {
          color: 'red',
          text: building.title,
        },
        title: building.title,
        options: { animation: -1 },
      }
      this.markers.push(marker)
    }
  }

  openInfo(marker: MapMarker, content: string) {
    let building = this.buildings.find((el: Building) => el.lat === marker.marker.getPosition().lat() && el.lng === marker.marker.getPosition().lng());
    this.showBuildingModal(building);
  }

  async showBuildingModal(building: Building) {
    const modal = await this.modalController.create({
      component: BuildingComponent,
      componentProps: {
        building: building
      }
    });
    return await modal.present();
  }

}