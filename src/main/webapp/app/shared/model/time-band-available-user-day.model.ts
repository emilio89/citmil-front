import { Moment } from "moment"
import { ICalendarYearUser } from "app/shared/model/calendar-year-user.model"
import { IUserExtra } from "app/shared/model/user-extra.model"

export interface ITimeBandAvailableUserDay {
  id?: number
  year?: number
  start?: Moment
  end?: Moment
  calendarYearUsers?: ICalendarYearUser[]
  userExtras?: IUserExtra[]
  companyId?: number
}

export class TimeBandAvailableUserDay implements ITimeBandAvailableUserDay {
  constructor(
    public id?: number,
    public year?: number,
    public start?: Moment,
    public end?: Moment,
    public calendarYearUsers?: ICalendarYearUser[],
    public userExtras?: IUserExtra[],
    public companyId?: number
  ) {}
}
