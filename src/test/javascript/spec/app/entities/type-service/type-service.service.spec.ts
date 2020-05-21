import { TestBed, getTestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TypeServiceService } from "app/entities/type-service/type-service.service"
import { ITypeService, TypeService } from "app/shared/model/type-service.model"

describe("Service Tests", () => {
  describe("TypeService Service", () => {
    let injector: TestBed
    let service: TypeServiceService
    let httpMock: HttpTestingController
    let elemDefault: ITypeService
    let expectedResult: ITypeService | ITypeService[] | boolean | null

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      })
      expectedResult = null
      injector = getTestBed()
      service = injector.get(TypeServiceService)
      httpMock = injector.get(HttpTestingController)

      elemDefault = new TypeService(0, "AAAAAAA", "AAAAAAA", 0, 0, 0, 0, "image/png", "AAAAAAA", false)
    })

    describe("Service methods", () => {
      it("should find an element", () => {
        const returnedFromService = Object.assign({}, elemDefault)

        service.find(123).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "GET" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(elemDefault)
      })

      it("should create a TypeService", () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        )

        const expected = Object.assign({}, returnedFromService)

        service.create(new TypeService()).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "POST" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should update a TypeService", () => {
        const returnedFromService = Object.assign(
          {
            name: "BBBBBB",
            description: "BBBBBB",
            durationMinutes: 1,
            maxDayAppointment: 1,
            minDayAppointment: 1,
            price: 1,
            icon: "BBBBBB",
            actived: true
          },
          elemDefault
        )

        const expected = Object.assign({}, returnedFromService)

        service.update(expected).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "PUT" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should return a list of TypeService", () => {
        const returnedFromService = Object.assign(
          {
            name: "BBBBBB",
            description: "BBBBBB",
            durationMinutes: 1,
            maxDayAppointment: 1,
            minDayAppointment: 1,
            price: 1,
            icon: "BBBBBB",
            actived: true
          },
          elemDefault
        )

        const expected = Object.assign({}, returnedFromService)

        service.query().subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "GET" })
        req.flush([returnedFromService])
        httpMock.verify()
        expect(expectedResult).toContainEqual(expected)
      })

      it("should delete a TypeService", () => {
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
