import { ITimeBandDay } from "./time-band.model"
import { IUser } from "./../core/user/user.model"

export interface IGenerateCalendarWeek {
  users?: IUser[]
  timeBandsDay?: ITimeBandDay[]
}
