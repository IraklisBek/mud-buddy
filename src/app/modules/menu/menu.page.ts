import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  selectedTab: string = "buildings";
  buildingsIcon: string = "list-icon-selected.svg"
  mapIcon: string = "map-icon.svg"
  searchIcon: string = "search-icon.svg"
  notificationsIcon: string = "notifications-icon.svg"
  inboxIcon: string = "inbox-icon.svg"
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  setCurrentTab() {
    this.setAllIconsToWhite();
    this.selectedTab = this.tabs.getSelected().toString();
    switch (this.selectedTab) {
      case 'buildings':
        this.buildingsIcon = "list-icon-selected.svg"
        break;
      case 'map':
        this.mapIcon = "map-icon-selected.svg"
        break;
      case 'search':
        this.searchIcon = "search-icon-selected.svg"
        break;
      case 'notifications':
        this.notificationsIcon = "notifications-icon-selected.svg"
        break;
      case 'inbox':
        this.inboxIcon = "inbox-icon-selected.svg"
        break;
    }
  }

  setAllIconsToWhite() {
    this.buildingsIcon = "list-icon.svg"
    this.mapIcon = "map-icon.svg"
    this.searchIcon = "search-icon.svg"
    this.notificationsIcon = "notifications-icon.svg"
    this.inboxIcon = "inbox-icon.svg"
  }
}
