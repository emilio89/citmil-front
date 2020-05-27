import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-generate-calendar-week',
  templateUrl: './generate-calendar-week.component.html',
  styleUrls: [
    'generate-calendar-week.component.scss'
  ]
})
export class GenerateCalendarWeekComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'GenerateCalendarWeekComponent message';
  }

  ngOnInit(): void {
  }

}
