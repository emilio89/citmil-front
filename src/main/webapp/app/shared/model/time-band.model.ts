import { Moment } from "moment"
import { ICalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"

export interface ITimeBand {
  id?: number
  start?: Moment
  end?: Moment
  calendarYearProfesionals?: ICalendarYearProfesional[]
  companyId?: number
}

export class TimeBand implements ITimeBand {
  constructor(public id?: number, public start?: Moment, public end?: Moment, public calendarYearProfesionals?: ICalendarYearProfesional[], public companyId?: number) {}
}
