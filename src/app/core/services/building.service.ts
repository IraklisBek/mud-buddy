import { Injectable } from '@angular/core';
import { Building } from '../models/building.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  
  public dummyBuildings: Building[] = [
    {
      title: "Building 1",
      description: "This is building 1. This building is a very nice building",
      photos: [
        "/assets/images/ex1.png"
      ],
      tags: [
        "Tag1", 
        "Tag2", 
        "Tag3"
      ],
      lng: 24.12312,
      lat: 32.23123,
      address: "Kastoria"
    },
    {
      title: "Building 2",
      description: "Building 2 is very nice",
      photos: [
        "/assets/images/ex2.png"
      ],
      tags: [
        "Tag1", 
        "Tag4", 
        "Tag5"
      ],
      lng: 25.12312,
      lat: 34.23123,
      address: "Serres"
    },
    {
      title: "Building 3",
      description: "Building 3 could be the best if it was not so old",
      photos: [
        "/assets/images/ex3.png"
      ],
      tags: [
        "Tag4", 
        "Tag6", 
        "Tag7"
      ],
      lng: 23.12312,
      lat: 32.23123,
      address: "Didimotixo"
    },
    {
      title: "Building 4",
      description: "This is building 1. This building is a very nice building",
      photos: [
        "/assets/images/ex4.jpg"
      ],
      tags: [
        "Tag1", 
        "Tag2", 
        "Tag3"
      ],
      lng: 20.12312,
      lat: 31.23123,
      address: "Kapou"
    }
  ]

  constructor() { }
}
