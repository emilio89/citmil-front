import { Moment } from "moment"

export interface IEventCalendarProfesional {
  nameProfesional?: string
  idUser?: number
  start?: Moment
  end?: Moment
}

export class EventCalendarProfesional implements IEventCalendarProfesional {
  constructor(public nameProfesional?: string, public idUser?: number, public start?: Moment, public end?: Moment) {}
}
