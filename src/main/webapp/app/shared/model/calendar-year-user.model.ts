import { Moment } from "moment"
import { IUserExtra } from "app/shared/model/user-extra.model"
import { ITimeBand } from "app/shared/model/time-band.model"

export interface ICalendarYearUser {
  id?: number
  day?: Moment
  year?: number
  isPublicHoliday?: boolean
  start?: Moment
  end?: Moment
  userExtras?: IUserExtra[]
  companyId?: number
  timeBandAvailableUserDayId?: number
  timeBands?: ITimeBand[]
}

export class CalendarYearUser implements ICalendarYearUser {
  constructor(
    public id?: number,
    public day?: Moment,
    public year?: number,
    public isPublicHoliday?: boolean,
    public start?: Moment,
    public end?: Moment,
    public userExtras?: IUserExtra[],
    public companyId?: number,
    public timeBandAvailableUserDayId?: number,
    public timeBands?: ITimeBand[]
  ) {
    this.isPublicHoliday = this.isPublicHoliday || false
  }
}
