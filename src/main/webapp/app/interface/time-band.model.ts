import { IDay } from "./day"

export interface ITimeBandDay {
  day?: IDay
  start?: String
  end?: String
}

export class TimeBandDay implements ITimeBandDay {
  constructor(public day?: IDay, public start?: String, public end?: String) {}
}
