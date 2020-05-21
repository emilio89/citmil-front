import { TestBed, getTestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import * as moment from "moment"
import { DATE_TIME_FORMAT } from "app/shared/constants/input.constants"
import { TimeBandAvailableProfesionalDayService } from "app/entities/time-band-available-profesional-day/time-band-available-profesional-day.service"
import { ITimeBandAvailableProfesionalDay, TimeBandAvailableProfesionalDay } from "app/shared/model/time-band-available-profesional-day.model"

describe("Service Tests", () => {
  describe("TimeBandAvailableProfesionalDay Service", () => {
    let injector: TestBed
    let service: TimeBandAvailableProfesionalDayService
    let httpMock: HttpTestingController
    let elemDefault: ITimeBandAvailableProfesionalDay
    let expectedResult: ITimeBandAvailableProfesionalDay | ITimeBandAvailableProfesionalDay[] | boolean | null
    let currentDate: moment.Moment

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      })
      expectedResult = null
      injector = getTestBed()
      service = injector.get(TimeBandAvailableProfesionalDayService)
      httpMock = injector.get(HttpTestingController)
      currentDate = moment()

      elemDefault = new TimeBandAvailableProfesionalDay(0, 0, currentDate, currentDate)
    })

    describe("Service methods", () => {
      it("should find an element", () => {
        const returnedFromService = Object.assign(
          {
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

      it("should create a TimeBandAvailableProfesionalDay", () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            start: currentDate.format(DATE_TIME_FORMAT),
            end: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        )

        const expected = Object.assign(
          {
            start: currentDate,
            end: currentDate
          },
          returnedFromService
        )

        service.create(new TimeBandAvailableProfesionalDay()).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "POST" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should update a TimeBandAvailableProfesionalDay", () => {
        const returnedFromService = Object.assign(
          {
            year: 1,
            start: currentDate.format(DATE_TIME_FORMAT),
            end: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        )

        const expected = Object.assign(
          {
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

      it("should return a list of TimeBandAvailableProfesionalDay", () => {
        const returnedFromService = Object.assign(
          {
            year: 1,
            start: currentDate.format(DATE_TIME_FORMAT),
            end: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        )

        const expected = Object.assign(
          {
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

      it("should delete a TimeBandAvailableProfesionalDay", () => {
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
