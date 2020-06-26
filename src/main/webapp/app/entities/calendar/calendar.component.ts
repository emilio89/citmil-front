import { IEventCalendarProfesional } from "./../../interface/event-calendar-profesional"
import { Component, OnInit, ViewChild } from "@angular/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import bootstrapPlugin from "@fullcalendar/bootstrap"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"

import { EventInput } from "@fullcalendar/core"
import timeGridPlugin from "@fullcalendar/timegrid"
import { MatDialog } from "@angular/material/dialog"
import { ModelEditWorkingDayComponent } from "./model-edit-working-day/model-edit-working-day.component"
import { CalendarService } from "./calendar.service"
import { HttpResponse } from "@angular/common/http"
import { Subscription, Subject } from "rxjs"
import { JhiEventManager } from "ng-jhipster"
import { FullCalendarComponent } from "@fullcalendar/angular"

@Component({
  selector: "jhi-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, interactionPlugin, bootstrapPlugin, timeGridPlugin, listPlugin] // important!
  calendarEvents: EventInput[] = []
  es = "es"

  eventsCalendar: IEventCalendarProfesional[]
  eventSubscriber?: Subscription
  refresh: Subject<any> = new Subject()
  @ViewChild("calendar") calendarComponent: FullCalendarComponent
  listColors = ["#8cc8f9", "#a2d5a4", "#f1898d", "#ffc97a", "#dab0e2", "#b4b4b4"]
  mapUserColor = new Map<number, string>()
  constructor(public dialog: MatDialog, public calendarService: CalendarService, protected eventManager: JhiEventManager) {}

  loadAll(): void {
    this.calendarService.getCalendarYearUserProfesional().subscribe((res: HttpResponse<IEventCalendarProfesional[]>) => {
      this.eventsCalendar = res.body || []
      let i = 0
      this.eventsCalendar.forEach(element => {
        if (!this.mapUserColor.get(element.idUser)) {
          this.mapUserColor.set(element.idUser, this.listColors[i])
          i++
        }

        const eventInput: EventInput = {
          title: element.nameProfesional,
          start: element.start.toDate(),
          end: element.end.toDate(),
          backgroundColor: this.mapUserColor.get(element.idUser),
          textColor: "black"
        }
        this.calendarEvents.push(eventInput)
      })
    })
  }

  ngOnInit(): void {
    this.loadAll()
    this.registerChangeInEvents()

    this.refresh.next()
  }

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

  registerChangeInEvents(): void {
    this.eventSubscriber = this.eventManager.subscribe("eventsListModification", () => this.loadAll())
  }
}
