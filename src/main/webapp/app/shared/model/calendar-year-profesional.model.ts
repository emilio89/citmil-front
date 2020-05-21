import { Moment } from "moment"
import { IProfesional } from "app/shared/model/profesional.model"
import { ITimeBand } from "app/shared/model/time-band.model"

export interface ICalendarYearProfesional {
  id?: number
  day?: Moment
  year?: number
  isPublicHoliday?: boolean
  start?: Moment
  end?: Moment
  profesionals?: IProfesional[]
  companyId?: number
  timeBandAvailableProfesionalDayId?: number
  timeBands?: ITimeBand[]
}

export class CalendarYearProfesional implements ICalendarYearProfesional {
  constructor(
    public id?: number,
    public day?: Moment,
    public year?: number,
    public isPublicHoliday?: boolean,
    public start?: Moment,
    public end?: Moment,
    public profesionals?: IProfesional[],
    public companyId?: number,
    public timeBandAvailableProfesionalDayId?: number,
    public timeBands?: ITimeBand[]
  ) {
    this.isPublicHoliday = this.isPublicHoliday || false
  }
}
