import { TestBed, getTestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import * as moment from "moment"
import { DATE_TIME_FORMAT } from "app/shared/constants/input.constants"
import { TimeBandService } from "app/entities/time-band/time-band.service"
import { ITimeBand, TimeBand } from "app/shared/model/time-band.model"

describe("Service Tests", () => {
  describe("TimeBand Service", () => {
    let injector: TestBed
    let service: TimeBandService
    let httpMock: HttpTestingController
    let elemDefault: ITimeBand
    let expectedResult: ITimeBand | ITimeBand[] | boolean | null
    let currentDate: moment.Moment

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      })
      expectedResult = null
      injector = getTestBed()
      service = injector.get(TimeBandService)
      httpMock = injector.get(HttpTestingController)
      currentDate = moment()

      elemDefault = new TimeBand(0, currentDate, currentDate)
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

      it("should create a TimeBand", () => {
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

        service.create(new TimeBand()).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "POST" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should update a TimeBand", () => {
        const returnedFromService = Object.assign(
          {
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

      it("should return a list of TimeBand", () => {
        const returnedFromService = Object.assign(
          {
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

      it("should delete a TimeBand", () => {
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
