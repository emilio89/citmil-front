import { TestBed, getTestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import * as moment from "moment"
import { DATE_FORMAT, DATE_TIME_FORMAT } from "app/shared/constants/input.constants"
import { CalendarYearUserService } from "app/entities/calendar-year-user/calendar-year-user.service"
import { ICalendarYearUser, CalendarYearUser } from "app/shared/model/calendar-year-user.model"

describe("Service Tests", () => {
  describe("CalendarYearUser Service", () => {
    let injector: TestBed
    let service: CalendarYearUserService
    let httpMock: HttpTestingController
    let elemDefault: ICalendarYearUser
    let expectedResult: ICalendarYearUser | ICalendarYearUser[] | boolean | null
    let currentDate: moment.Moment

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      })
      expectedResult = null
      injector = getTestBed()
      service = injector.get(CalendarYearUserService)
      httpMock = injector.get(HttpTestingController)
      currentDate = moment()

      elemDefault = new CalendarYearUser(0, currentDate, 0, false, currentDate, currentDate)
    })

    describe("Service methods", () => {
      it("should find an element", () => {
        const returnedFromService = Object.assign(
          {
            day: currentDate.format(DATE_FORMAT),
            start: currentDate.format(DATE_TIME_FORMAT),
            end: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        )

        service.find(123).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "GET" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(elemDefault)
      })

      it("should create a CalendarYearUser", () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            day: currentDate.format(DATE_FORMAT),
            start: currentDate.format(DATE_TIME_FORMAT),
            end: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        )

        const expected = Object.assign(
          {
            day: currentDate,
            start: currentDate,
            end: currentDate
          },
          returnedFromService
        )

        service.create(new CalendarYearUser()).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "POST" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should update a CalendarYearUser", () => {
        const returnedFromService = Object.assign(
          {
            day: currentDate.format(DATE_FORMAT),
            year: 1,
            isPublicHoliday: true,
            start: currentDate.format(DATE_TIME_FORMAT),
            end: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        )

        const expected = Object.assign(
          {
            day: currentDate,
            start: currentDate,
            end: currentDate
          },
          returnedFromService
        )

        service.update(expected).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "PUT" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should return a list of CalendarYearUser", () => {
        const returnedFromService = Object.assign(
          {
            day: currentDate.format(DATE_FORMAT),
            year: 1,
            isPublicHoliday: true,
            start: currentDate.format(DATE_TIME_FORMAT),
            end: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        )

        const expected = Object.assign(
          {
            day: currentDate,
            start: currentDate,
            end: currentDate
          },
          returnedFromService
        )

        service.query().subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "GET" })
        req.flush([returnedFromService])
        httpMock.verify()
        expect(expectedResult).toContainEqual(expected)
      })

      it("should delete a CalendarYearUser", () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok))

        const req = httpMock.expectOne({ method: "DELETE" })
        req.flush({ status: 200 })
        expect(expectedResult)
      })
    })

    afterEach(() => {
      httpMock.verify()
    })
  })
})
