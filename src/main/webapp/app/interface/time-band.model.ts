import { Moment } from "moment"

export interface ITimeBandDay {
  day?: Date
  start?: Moment
  end?: Moment
}

export class TimeBandDay implements ITimeBandDay {
  constructor(public day?: Date, public start?: Moment, public end?: Moment) {}
}
