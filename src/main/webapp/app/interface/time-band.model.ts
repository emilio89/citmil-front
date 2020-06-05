import { Moment } from "moment"

export interface ITimeBandDay {
  day?: string
  start?: Moment
  end?: Moment
}

export class TimeBandDay implements ITimeBandDay {
  constructor(public day?: string, public start?: Moment, public end?: Moment) {}
}
