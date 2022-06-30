import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { grow } from 'src/app/core/animations/grow';
import { GeneralService } from 'src/app/core/services/general.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [grow]
})
export class MenuComponent implements OnInit {
  @ViewChild('expand') expandRef: ElementRef;

  show: boolean = false;
  constructor(
    private generalService: GeneralService,
    private gestureCtrl: GestureController
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.initializeGesture();
  }

  toggleMenu() {
    this.show = !this.show
    this.showMenu(this.show)
  }

  showMenu(show: boolean) {
    let rotateDegrees = show ? -180 : 0;
    (document.querySelector("#expandArrowIcon") as HTMLElement).style.transform = `rotate(${rotateDegrees}deg)`;
    this.generalService.growAnimationFullHeightHelper('menuItems', show, 250, 250)
  }

  /**
   * This is useful to detect swipe on footer.
   * Since the footer is on top of the slides,
   * this is the only way to do it.
   * Users might swipe in that area too, so we
   * cover that also.
   */
  initializeGesture() {
    const gesture = this.gestureCtrl.create({
      el: this.expandRef.nativeElement,
      gestureName: "swipe",
      onMove: (detail) => { this.onMove(detail); }
    })
    gesture.enable();
  }

  private onMove(detail) {
    console.log(detail)
  }
}