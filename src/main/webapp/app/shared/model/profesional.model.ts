import { Moment } from "moment"
import { IAppointment } from "app/shared/model/appointment.model"
import { ITypeService } from "app/shared/model/type-service.model"

export interface IProfesional {
  id?: number
  firstName?: string
  lastName?: string
  description?: string
  email?: string
  address?: string
  phone?: string
  birthdate?: Moment
  urlImgContentType?: string
  urlImg?: any
  actived?: boolean
  deleted?: boolean
  appointments?: IAppointment[]
  typeServices?: ITypeService[]
  calendarYearProfesionalId?: number
  companyId?: number
  timeBandAvailableProfesionalDayId?: number
}

export class Profesional implements IProfesional {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public description?: string,
    public email?: string,
    public address?: string,
    public phone?: string,
    public birthdate?: Moment,
    public urlImgContentType?: string,
    public urlImg?: any,
    public actived?: boolean,
    public deleted?: boolean,
    public appointments?: IAppointment[],
    public typeServices?: ITypeService[],
    public calendarYearProfesionalId?: number,
    public companyId?: number,
    public timeBandAvailableProfesionalDayId?: number
  ) {
    this.actived = this.actived || false
    this.deleted = this.deleted || false
  }
}
