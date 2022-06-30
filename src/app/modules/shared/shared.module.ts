import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { AddBtnComponent } from './add-btn/add-btn.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    AddBtnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    AddBtnComponent
  ]
})
export class SharedModule { }
