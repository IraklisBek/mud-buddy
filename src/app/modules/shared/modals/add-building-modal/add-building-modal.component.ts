import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { Building } from 'src/app/core/models/building.model';
import { Position } from 'src/app/core/models/map.model';

@Component({
  selector: 'app-add-building-modal',
  templateUrl: './add-building-modal.component.html',
  styleUrls: ['./add-building-modal.component.scss'],
})
export class AddBuildingModalComponent implements OnInit {
  @ViewChild('slides', { static: true }) slidesRef: ElementRef;
  userPosition: Position = {} as Position;
  building: Building = {} as Building;
  addBuildingForm: FormGroup = {} as FormGroup
  showError: boolean = false;
  showDropPin: boolean = false;
  btnClicked: boolean = false;
  photosUpload: string[] = [];
  formattedaddress = " ";

  public slideOpts = {
    speed: 400
  };

  constructor(
    private geolocation: Geolocation,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.building.photos = [];
    this.building.tags = [];
    this.initializeFormGroup();
    this.getUserLocation();
  }

  ngAfterViewInit() {
    this.slidesRef.nativeElement.lockSwipes(true);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  private initializeFormGroup() {
    this.addBuildingForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      tags: new FormControl(null, {
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  private getUserLocation() {
    this.geolocation.getCurrentPosition().then((res) => {
      this.userPosition = {
        lat: res.coords.latitude,
        lng: res.coords.longitude
      };
      this.building.position = { 
        lat: res.coords.latitude, 
        lng: res.coords.longitude
      };
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  get errorControl() {
    return this.addBuildingForm.controls;
  }

  nextStep(formControl: string) {
    this.btnClicked = true;
    let value = this.addBuildingForm.value;
    switch (formControl) {
      case 'title':
        if (value.title === null || value.title === '') {
        } else {
          this.building.title = value.title
          this.allowNext()
        }
        break;
      case 'description':
        if (value.description === null || value.description === '') {
        } else {
          this.building.description = value.description
          this.allowNext()
        }
        break;
      case 'tags':
        if (value.tags === null || value.tags === '') {
        } else {
          let tagsArray: [] = value.tags.split(",")
          console.log(tagsArray)
          tagsArray.forEach(element => {
            this.building.tags.push(element)
          });
          this.allowNext()
        }
        break
      case 'files':
        if (this.building.photos.length === 0) {
          this.showError = true;
        } else {
          this.allowNext()
        }
        break;
      case 'place':
        // this.building.address = value.location;
        this.addBuilding()
        break;
    }
  }

  allowNext() {
    this.showError = false;
    this.slidesRef.nativeElement.lockSwipes(false);
    this.slidesRef.nativeElement.slideNext();
  }

  onSlideNext() {
    this.btnClicked = false;
  }

  toggleDropPin() {
    this.showDropPin = !this.showDropPin
  }

  prevStep() {
    this.slidesRef.nativeElement.slidePrev();
  }

  onSlidePrev() {

  }

  locationPosition() {
    this.building.position = { 
      lat: this.userPosition.lat, 
      lng: this.userPosition.lng
    };
    this.addBuilding()

    // this.toastr.success("Building has been uploaded using your current position")
  }

  onPinPositionChanged(event: { position: Position }) {
    this.building.position = { 
      lat: event.position.lat, 
      lng: event.position.lng
    };
    console.log(this.building)
  }

  onUploadFinished(event: any) {
    this.building.photos.push(event.filePath);
    this.showError = false;
  }


  public AddressChange(address: any) {
    //setting address from API to local variable 
    console.log(address)
    var location = address.geometry.location;
    this.building.position = { 
      lat: location.lat(), 
      lng: location.lng() 
    };
    this.formattedaddress = address.formatted_address
  }

  addBuilding() {
    console.log(this.building)
    this.allowNext();
  }
}
