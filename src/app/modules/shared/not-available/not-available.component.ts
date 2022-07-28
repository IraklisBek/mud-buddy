import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-available',
  templateUrl: './not-available.component.html',
  styleUrls: ['./not-available.component.scss'],
})
export class NotAvailableComponent implements OnInit {
  @Input() title: string = '';
  constructor() { }

  ngOnInit() {}

}
