import { Component, OnInit } from "@angular/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import bootstrapPlugin from "@fullcalendar/bootstrap"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"

import { EventInput } from "@fullcalendar/core"
import timeGridPlugin from "@fullcalendar/timegrid"
import { MatDialog } from "@angular/material/dialog"
import { ModelEditWorkingDayComponent } from "./model-edit-working-day/model-edit-working-day.component"

@Component({
  selector: "jhi-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, interactionPlugin, bootstrapPlugin, timeGridPlugin, listPlugin] // important!
  calendarEvents: EventInput[] = [{ title: "Evento hoxe", start: new Date() }]

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  handleDateClick(arg: EventInput): void {
    const dialogRef = this.dialog.open(ModelEditWorkingDayComponent, {
      width: "250px",
      data: { arg }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.error("The dialog was closed", result)
    })
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
