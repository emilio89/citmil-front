import { IProfesional } from "app/shared/model/profesional.model"

export interface ITypeService {
  id?: number
  name?: string
  description?: string
  durationMinutes?: number
  maxDayAppointment?: number
  minDayAppointment?: number
  price?: number
  iconContentType?: string
  icon?: any
  actived?: boolean
  companyId?: number
  profesionals?: IProfesional[]
}

export class TypeService implements ITypeService {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public durationMinutes?: number,
    public maxDayAppointment?: number,
    public minDayAppointment?: number,
    public price?: number,
    public iconContentType?: string,
    public icon?: any,
    public actived?: boolean,
    public companyId?: number,
    public profesionals?: IProfesional[]
  ) {
    this.actived = this.actived || false
  }
}
