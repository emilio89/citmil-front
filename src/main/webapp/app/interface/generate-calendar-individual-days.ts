import { ITimeBandDay } from "./time-band.model"
import { IUser } from "../core/user/user.model"

export interface IGenerateCalendarIndividualDays {
  users?: IUser[]
  timeBandsDay?: ITimeBandDay[]
}
