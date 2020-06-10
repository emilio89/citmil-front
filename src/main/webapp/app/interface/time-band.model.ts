import { Moment } from "moment"

export interface ITimeBandDay {
  day?: Date
  start?: String
  end?: String
}

export class TimeBandDay implements ITimeBandDay {
  constructor(public day?: Date, public start?: String, public end?: String) {}
}
