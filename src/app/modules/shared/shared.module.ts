import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { AddBtnComponent } from './add-btn/add-btn.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBuildingModalComponent } from './modals/add-building-modal/add-building-modal.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    AddBtnComponent,
    AddBuildingModalComponent,
    UploadFilesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    AddBtnComponent,
    AddBuildingModalComponent,
    UploadFilesComponent
  ]
})
export class SharedModule { }
