import { Moment } from "moment"
import { ICalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"
import { IProfesional } from "app/shared/model/profesional.model"

export interface ITimeBandAvailableProfesionalDay {
  id?: number
  year?: number
  start?: Moment
  end?: Moment
  calendarYearProfesionals?: ICalendarYearProfesional[]
  profesionals?: IProfesional[]
  companyId?: number
}

export class TimeBandAvailableProfesionalDay implements ITimeBandAvailableProfesionalDay {
  constructor(
    public id?: number,
    public year?: number,
    public start?: Moment,
    public end?: Moment,
    public calendarYearProfesionals?: ICalendarYearProfesional[],
    public profesionals?: IProfesional[],
    public companyId?: number
  ) {}
}
