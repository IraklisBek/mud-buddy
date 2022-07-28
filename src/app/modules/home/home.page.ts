import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Building } from 'src/app/core/models/building.model';
import { BuildingService } from 'src/app/core/services/building.service';
import { BuildingComponent } from '../shared/modals/building/building.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public buildings: Building[] = this.buildingService.dummyBuildings;
  public slideOpts = {
    speed: 200,
    autoplay:true
  };

  constructor(
    private modalController: ModalController,
    private buildingService: BuildingService
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
