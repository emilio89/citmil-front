import { TestBed, getTestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import * as moment from "moment"
import { DATE_FORMAT } from "app/shared/constants/input.constants"
import { ProfesionalService } from "app/entities/profesional/profesional.service"
import { IProfesional, Profesional } from "app/shared/model/profesional.model"

describe("Service Tests", () => {
  describe("Profesional Service", () => {
    let injector: TestBed
    let service: ProfesionalService
    let httpMock: HttpTestingController
    let elemDefault: IProfesional
    let expectedResult: IProfesional | IProfesional[] | boolean | null
    let currentDate: moment.Moment

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      })
      expectedResult = null
      injector = getTestBed()
      service = injector.get(ProfesionalService)
      httpMock = injector.get(HttpTestingController)
      currentDate = moment()

      elemDefault = new Profesional(0, "AAAAAAA", "AAAAAAA", "AAAAAAA", "AAAAAAA", "AAAAAAA", "AAAAAAA", currentDate, "image/png", "AAAAAAA", false, false)
    })

    describe("Service methods", () => {
      it("should find an element", () => {
        const returnedFromService = Object.assign(
          {
            birthdate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        )

        service.find(123).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "GET" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(elemDefault)
      })

      it("should create a Profesional", () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            birthdate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        )

        const expected = Object.assign(
          {
            birthdate: currentDate
          },
          returnedFromService
        )

        service.create(new Profesional()).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "POST" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should update a Profesional", () => {
        const returnedFromService = Object.assign(
          {
            firstName: "BBBBBB",
            lastName: "BBBBBB",
            description: "BBBBBB",
            email: "BBBBBB",
            address: "BBBBBB",
            phone: "BBBBBB",
            birthdate: currentDate.format(DATE_FORMAT),
            urlImg: "BBBBBB",
            actived: true,
            deleted: true
          },
          elemDefault
        )

        const expected = Object.assign(
          {
            birthdate: currentDate
          },
          returnedFromService
        )

        service.update(expected).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "PUT" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should return a list of Profesional", () => {
        const returnedFromService = Object.assign(
          {
            firstName: "BBBBBB",
            lastName: "BBBBBB",
            description: "BBBBBB",
            email: "BBBBBB",
            address: "BBBBBB",
            phone: "BBBBBB",
            birthdate: currentDate.format(DATE_FORMAT),
            urlImg: "BBBBBB",
            actived: true,
            deleted: true
          },
          elemDefault
        )

        const expected = Object.assign(
          {
            birthdate: currentDate
          },
          returnedFromService
        )

        service.query().subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "GET" })
        req.flush([returnedFromService])
        httpMock.verify()
        expect(expectedResult).toContainEqual(expected)
      })

      it("should delete a Profesional", () => {
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
