import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Building } from 'src/app/core/models/building.model';
import { BuildingService } from 'src/app/core/services/building.service';
import { BuildingComponent } from '../shared/modals/building/building.component';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.page.html',
  styleUrls: ['./buildings.page.scss'],
})
export class BuildingsPage implements OnInit {
  public buildings: Building[] = this.buildingService.dummyBuildings;

  constructor(
    private buildingService: BuildingService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
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
