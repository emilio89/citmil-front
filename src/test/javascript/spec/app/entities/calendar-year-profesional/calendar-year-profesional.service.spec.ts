import { TestBed, getTestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import * as moment from "moment"
import { DATE_FORMAT, DATE_TIME_FORMAT } from "app/shared/constants/input.constants"
import { CalendarYearProfesionalService } from "app/entities/calendar-year-profesional/calendar-year-profesional.service"
import { ICalendarYearProfesional, CalendarYearProfesional } from "app/shared/model/calendar-year-profesional.model"

describe("Service Tests", () => {
  describe("CalendarYearProfesional Service", () => {
    let injector: TestBed
    let service: CalendarYearProfesionalService
    let httpMock: HttpTestingController
    let elemDefault: ICalendarYearProfesional
    let expectedResult: ICalendarYearProfesional | ICalendarYearProfesional[] | boolean | null
    let currentDate: moment.Moment

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      })
      expectedResult = null
      injector = getTestBed()
      service = injector.get(CalendarYearProfesionalService)
      httpMock = injector.get(HttpTestingController)
      currentDate = moment()

      elemDefault = new CalendarYearProfesional(0, currentDate, 0, false, currentDate, currentDate)
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

      it("should create a CalendarYearProfesional", () => {
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

        service.create(new CalendarYearProfesional()).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "POST" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should update a CalendarYearProfesional", () => {
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

      it("should return a list of CalendarYearProfesional", () => {
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

      it("should delete a CalendarYearProfesional", () => {
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
