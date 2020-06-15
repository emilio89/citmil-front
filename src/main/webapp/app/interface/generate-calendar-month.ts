import { ITimeBandDay } from "./time-band.model"
import { IUser } from "../core/user/user.model"

export interface IGenerateCalendarMonth {
  users?: IUser[]
  month?: Date
  days?: ITimeBandDay[]
}
