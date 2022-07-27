import { Component, Input, OnInit } from '@angular/core';
import { Building } from 'src/app/core/models/building.model';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss'],
})
export class BuildingComponent implements OnInit {
  @Input() building: Building = {} as Building;
  constructor() { }

  ngOnInit() {
    console.log(this.building)
  }

}
