import { Injectable } from '@angular/core';
import { Building, Tag } from '../models/building.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  public dummyTags: Tag[] = [
    {
      id: 1,
      title: "Tag1"
    },
    {
      id: 2,
      title: "Tag2"
    },
    {
      id: 3,
      title: "Tag3"
    },
    {
      id: 4,
      title: "Tag4"
    },
    {
      id: 5,
      title: "Tag5"
    },
    {
      id: 6,
      title: "Tag6"
    }
  ]

  public dummyBuildings: Building[] = [
    {
      id: 1,
      title: "Building 1",
      description: "This is building 1. This building is a very nice building",
      photos: [
        "/assets/images/ex1.png"
      ],
      tags: [
        this.dummyTags[0],
        this.dummyTags[1]
      ],
      position: {
        lng: 24.12312,
        lat: 32.23123,
      },
      address: "Kastoria"
    },
    {
      id: 2,
      title: "Building 2",
      description: "Building 2 is very nice",
      photos: [
        "/assets/images/ex2.png"
      ],
      tags: [
        this.dummyTags[1],
        this.dummyTags[2]
      ],
      position: {
        lng: 25.12312,
        lat: 34.23123,
      },
      address: "Serres"
    },
    {
      id: 3,
      title: "Building 3",
      description: "Building 3 could be the best if it was not so old",
      photos: [
        "/assets/images/ex3.png"
      ],
      tags: [
        this.dummyTags[3],
        this.dummyTags[4]
      ],
      position: {
        lng: 23.12312,
        lat: 32.23123,
      },
      address: "Didimotixo"
    },
    {
      id: 4,
      title: "Building 4",
      description: "This is building 1. This building is a very nice building",
      photos: [
        "/assets/images/ex4.jpg"
      ],
      tags: [
        this.dummyTags[5]
      ],
      position: {
        lng: 20.12312,
        lat: 31.23123,
      },
      address: "Kapou"
    }
  ]

  constructor() { }
}
