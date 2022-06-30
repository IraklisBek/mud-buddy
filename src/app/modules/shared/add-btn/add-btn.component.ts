import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddBuildingModalComponent } from '../modals/add-building-modal/add-building-modal.component';

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.scss'],
})
export class AddBtnComponent implements OnInit {
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  async showAddBuildingModal() {
    const modal = await this.modalController.create({
      component: AddBuildingModalComponent
    });
    return await modal.present();
  }

}
