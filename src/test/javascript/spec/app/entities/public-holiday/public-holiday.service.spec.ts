import { TestBed, getTestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import * as moment from "moment"
import { DATE_FORMAT } from "app/shared/constants/input.constants"
import { PublicHolidayService } from "app/entities/public-holiday/public-holiday.service"
import { IPublicHoliday, PublicHoliday } from "app/shared/model/public-holiday.model"

describe("Service Tests", () => {
  describe("PublicHoliday Service", () => {
    let injector: TestBed
    let service: PublicHolidayService
    let httpMock: HttpTestingController
    let elemDefault: IPublicHoliday
    let expectedResult: IPublicHoliday | IPublicHoliday[] | boolean | null
    let currentDate: moment.Moment

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      })
      expectedResult = null
      injector = getTestBed()
      service = injector.get(PublicHolidayService)
      httpMock = injector.get(HttpTestingController)
      currentDate = moment()

      elemDefault = new PublicHoliday(0, currentDate, 0, "AAAAAAA", "AAAAAAA")
    })

    describe("Service methods", () => {
      it("should find an element", () => {
        const returnedFromService = Object.assign(
          {
            day: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        )

        service.find(123).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "GET" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(elemDefault)
      })

      it("should create a PublicHoliday", () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            day: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        )

        const expected = Object.assign(
          {
            day: currentDate
          },
          returnedFromService
        )

        service.create(new PublicHoliday()).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "POST" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should update a PublicHoliday", () => {
        const returnedFromService = Object.assign(
          {
            day: currentDate.format(DATE_FORMAT),
            year: 1,
            name: "BBBBBB",
            dni: "BBBBBB"
          },
          elemDefault
        )

        const expected = Object.assign(
          {
            day: currentDate
          },
          returnedFromService
        )

        service.update(expected).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "PUT" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should return a list of PublicHoliday", () => {
        const returnedFromService = Object.assign(
          {
            day: currentDate.format(DATE_FORMAT),
            year: 1,
            name: "BBBBBB",
            dni: "BBBBBB"
          },
          elemDefault
        )

        const expected = Object.assign(
          {
            day: currentDate
          },
          returnedFromService
        )

        service.query().subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "GET" })
        req.flush([returnedFromService])
        httpMock.verify()
        expect(expectedResult).toContainEqual(expected)
      })

      it("should delete a PublicHoliday", () => {
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
