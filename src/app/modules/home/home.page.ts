import { Component, OnInit } from '@angular/core';
import { Building } from 'src/app/core/models/building.model';
import { BuildingService } from 'src/app/core/services/building.service';

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
    private buildingService: BuildingService
  ) { }

  ngOnInit() {
  }

}
