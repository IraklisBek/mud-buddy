import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-building-modal',
  templateUrl: './add-building-modal.component.html',
  styleUrls: ['./add-building-modal.component.scss'],
})
export class AddBuildingModalComponent implements OnInit {
  @ViewChild('slides', { static: true }) slidesRef: ElementRef;
  addBuildingForm: FormGroup = {} as FormGroup
  showError: boolean = false;
  btnClicked: boolean = false;
  public slideOpts = {
    speed: 400
  };

  constructor() { }

  ngOnInit() {
    this.initializeFormGroup();
  }

  ngAfterViewInit() {
    this.slidesRef.nativeElement.lockSwipes(true);
  }

  private initializeFormGroup() {
    this.addBuildingForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      tags: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  get errorControl() {
    return this.addBuildingForm.controls;
  }

  nextStep(formControl: string) {
    this.btnClicked = true;
    let value = this.addBuildingForm.value;
    switch (formControl) {
      case 'title':
        if (value.title === null || value.title === '') {
          this.showError = true;
        } else {
          this.allowNext()
        }
        break;
      case 'description':
        if (value.description === null || value.description === '') {
          this.showError = true;
        } else {
          this.allowNext()
        }
        break;
      case 'tags':
        if (value.description === null || value.description === '') {
          this.showError = true;
        } else {
          this.allowNext()
        }
        break
      case 'files':
        break;
    }
  }

  allowNext() {
    this.showError = false;
    this.slidesRef.nativeElement.lockSwipes(false);
    this.slidesRef.nativeElement.slideNext();
  }

  onSlideNext() {
    this.btnClicked = false;
  }

  prevStep() {
    this.slidesRef.nativeElement.slidePrev();
  }

  onSlidePrev() {

  }
}
