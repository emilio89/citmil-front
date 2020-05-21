import { Moment } from "moment"

export interface IAppointment {
  id?: number
  name?: string
  comments?: string
  email?: string
  phone?: string
  dni?: string
  start?: Moment
  end?: Moment
  actived?: boolean
  profesionalId?: number
  companyId?: number
}

export class Appointment implements IAppointment {
  constructor(
    public id?: number,
    public name?: string,
    public comments?: string,
    public email?: string,
    public phone?: string,
    public dni?: string,
    public start?: Moment,
    public end?: Moment,
    public actived?: boolean,
    public profesionalId?: number,
    public companyId?: number
  ) {
    this.actived = this.actived || false
  }
}
