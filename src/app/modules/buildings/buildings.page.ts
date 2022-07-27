import { Component, OnInit } from '@angular/core';
import { Building } from 'src/app/core/models/building.model';
import { BuildingService } from 'src/app/core/services/building.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.page.html',
  styleUrls: ['./buildings.page.scss'],
})
export class BuildingsPage implements OnInit {
  public buildings: Building[] = this.buildingService.dummyBuildings;

  constructor(
    private buildingService: BuildingService
  ) { }

  ngOnInit() {
  }

}
