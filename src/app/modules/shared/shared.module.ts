import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { AddBtnComponent } from './add-btn/add-btn.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBuildingModalComponent } from './modals/add-building-modal/add-building-modal.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NotAvailableComponent } from './not-available/not-available.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    AddBtnComponent,
    AddBuildingModalComponent,
    UploadFilesComponent,
    TakePhotoComponent,
    NotAvailableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    AddBtnComponent,
    AddBuildingModalComponent,
    UploadFilesComponent,
    TakePhotoComponent,
    NotAvailableComponent
  ],
  providers: [
    Geolocation
  ]
})
export class SharedModule { }
