import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isInProfile: boolean = false;
  profileImg: string = "/assets/icons/profile.svg"
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.profileImg = this.isInProfile? "/assets/icons/profile-selected.svg": "/assets/icons/profile.svg"
  }

  navigateTo(url: string){
    this.router.navigate([url])
  }
}
