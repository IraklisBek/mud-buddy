import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  growAnimationFullHeightHelper(elementId: string, show: boolean, time: number, minusHeight: number) {
    if (show) {
      setTimeout(() => {
        document.getElementById(elementId).style.minHeight = screen.height - minusHeight + "px"
      }, time);
    } else {
        document.getElementById(elementId).style.minHeight = "auto"
    }
  }
}
