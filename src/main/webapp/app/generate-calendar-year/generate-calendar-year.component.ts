import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-generate-calendar-year',
  templateUrl: './generate-calendar-year.component.html',
  styleUrls: [
    'generate-calendar-year.component.scss'
  ]
})
export class GenerateCalendarYearComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'GenerateCalendarYearComponent message';
  }

  ngOnInit(): void {
  }

}
