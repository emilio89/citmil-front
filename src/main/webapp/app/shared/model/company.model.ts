import { IUserExtra } from "app/shared/model/user-extra.model"
import { ICalendarYearUser } from "app/shared/model/calendar-year-user.model"
import { IAppointment } from "app/shared/model/appointment.model"
import { ITypeService } from "app/shared/model/type-service.model"
import { IPublicHoliday } from "app/shared/model/public-holiday.model"
import { ITimeBand } from "app/shared/model/time-band.model"
import { IDynamicContent } from "app/shared/model/dynamic-content.model"
import { IMenuOptionsAvailable } from "app/shared/model/menu-options-available.model"
import { ITimeBandAvailableUserDay } from "app/shared/model/time-band-available-user-day.model"

export interface ICompany {
  id?: number
  name?: string
  description?: string
  primaryColor?: string
  secondaryColor?: string
  urlImgContentType?: string
  urlImg?: any
  email?: string
  phone?: string
  maxDayAppointment?: number
  minDayAppointment?: number
  lat?: number
  lng?: number
  userExtras?: IUserExtra[]
  calendarYearUsers?: ICalendarYearUser[]
  appointments?: IAppointment[]
  typeServices?: ITypeService[]
  publicHolidays?: IPublicHoliday[]
  timeBands?: ITimeBand[]
  dynamicContents?: IDynamicContent[]
  menuOptionsAvailables?: IMenuOptionsAvailable[]
  timeBandAvailableUserDays?: ITimeBandAvailableUserDay[]
}

export class Company implements ICompany {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public primaryColor?: string,
    public secondaryColor?: string,
    public urlImgContentType?: string,
    public urlImg?: any,
    public email?: string,
    public phone?: string,
    public maxDayAppointment?: number,
    public minDayAppointment?: number,
    public lat?: number,
    public lng?: number,
    public userExtras?: IUserExtra[],
    public calendarYearUsers?: ICalendarYearUser[],
    public appointments?: IAppointment[],
    public typeServices?: ITypeService[],
    public publicHolidays?: IPublicHoliday[],
    public timeBands?: ITimeBand[],
    public dynamicContents?: IDynamicContent[],
    public menuOptionsAvailables?: IMenuOptionsAvailable[],
    public timeBandAvailableUserDays?: ITimeBandAvailableUserDay[]
  ) {}
}
