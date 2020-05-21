import { Moment } from "moment"

export interface IPublicHoliday {
  id?: number
  day?: Moment
  year?: number
  name?: string
  dni?: string
  companyId?: number
}

export class PublicHoliday implements IPublicHoliday {
  constructor(public id?: number, public day?: Moment, public year?: number, public name?: string, public dni?: string, public companyId?: number) {}
}
