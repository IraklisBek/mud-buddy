import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Marker, Position } from 'src/app/core/models/map.model';

@Component({
  selector: 'app-drop-pin',
  templateUrl: './drop-pin.component.html',
  styleUrls: ['./drop-pin.component.scss'],
})
export class DropPinComponent implements OnInit {
  @Output() pinPositionChanged: EventEmitter<{ position: Position }> = new EventEmitter<{ position: Position }>()
  markerPosition: Position = {
    lat: 0, lng: 0
  }
  center: Position = {
    lat: 0, lng: 0
  }
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    disableDoubleClickZoom: true,
  }
  marker: Marker = {
    position: this.markerPosition,
    label: {
      color: 'red',
      text: "Drop Pin",
    },
    title: "",
    options: { animation: google.maps.Animation.DROP },
  }
  constructor(
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.getUserLocation();
    this.pinPositionChanged.emit({ position: this.markerPosition })
  }

  onMapDrag(map: GoogleMap) {
    this.markerPosition = {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng()
    }
    this.pinPositionChanged.emit({ position: this.markerPosition })
  }

  private getUserLocation() {
    this.geolocation.getCurrentPosition().then((res) => {
      this.center = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      }
      this.markerPosition = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
