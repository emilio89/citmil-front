import { Moment } from "moment"
import { ICalendarYearUser } from "app/shared/model/calendar-year-user.model"

export interface ITimeBand {
  id?: number
  start?: Moment
  end?: Moment
  calendarYearUsers?: ICalendarYearUser[]
  companyId?: number
}

export class TimeBand implements ITimeBand {
  constructor(public id?: number, public start?: Moment, public end?: Moment, public calendarYearUsers?: ICalendarYearUser[], public companyId?: number) {}
}
