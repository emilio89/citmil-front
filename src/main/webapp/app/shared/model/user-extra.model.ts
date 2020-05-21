import { Moment } from "moment"
import { IAppointment } from "app/shared/model/appointment.model"
import { ITypeService } from "app/shared/model/type-service.model"

export interface IUserExtra {
  id?: number
  description?: string
  address?: string
  phone?: string
  birthdate?: Moment
  urlImgContentType?: string
  urlImg?: any
  actived?: boolean
  deleted?: boolean
  userId?: number
  appointments?: IAppointment[]
  typeServices?: ITypeService[]
  calendarYearUserId?: number
  companyId?: number
  timeBandAvailableUserDayId?: number
}

export class UserExtra implements IUserExtra {
  constructor(
    public id?: number,
    public description?: string,
    public address?: string,
    public phone?: string,
    public birthdate?: Moment,
    public urlImgContentType?: string,
    public urlImg?: any,
    public actived?: boolean,
    public deleted?: boolean,
    public userId?: number,
    public appointments?: IAppointment[],
    public typeServices?: ITypeService[],
    public calendarYearUserId?: number,
    public companyId?: number,
    public timeBandAvailableUserDayId?: number
  ) {
    this.actived = this.actived || false
    this.deleted = this.deleted || false
  }
}
