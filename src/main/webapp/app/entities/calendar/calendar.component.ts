import { Component, OnInit } from "@angular/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import bootstrapPlugin from "@fullcalendar/bootstrap"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"

import { EventInput } from "@fullcalendar/core"
import timeGridPlugin from "@fullcalendar/timegrid"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

@Component({
  selector: "jhi-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, interactionPlugin, bootstrapPlugin, timeGridPlugin, listPlugin] // important!
  calendarEvents: EventInput[] = [{ title: "Evento hoxe", start: new Date() }]
  isLinear = false
  firstFormGroup!: FormGroup
  secondFormGroup!: FormGroup

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ["", Validators.required]
    })
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ["", Validators.required]
    })
  }

  handleDateClick(arg: EventInput): void {
    if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      this.calendarEvents = this.calendarEvents.concat({
        // add new event data. must create new array
        title: "New Event",
        start: arg.date,
        allDay: arg.allDay
      })
    }
  }
  handleEventClick(arg: EventInput): void {
    if (confirm("Would EDIT EVENTO to " + arg.event.title + " ?")) {
      this.calendarEvents = this.calendarEvents.concat({
        // add new event data. must create new array
      })
    }
  }
  drop(arg: any): void {
    console.error(arg)
  }
  eventDragStop(arg: any): void {
    console.error(arg)
  }
}
