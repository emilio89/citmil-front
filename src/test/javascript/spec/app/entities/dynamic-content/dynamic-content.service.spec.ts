import { TestBed, getTestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { DynamicContentService } from "app/entities/dynamic-content/dynamic-content.service"
import { IDynamicContent, DynamicContent } from "app/shared/model/dynamic-content.model"

describe("Service Tests", () => {
  describe("DynamicContent Service", () => {
    let injector: TestBed
    let service: DynamicContentService
    let httpMock: HttpTestingController
    let elemDefault: IDynamicContent
    let expectedResult: IDynamicContent | IDynamicContent[] | boolean | null

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      })
      expectedResult = null
      injector = getTestBed()
      service = injector.get(DynamicContentService)
      httpMock = injector.get(HttpTestingController)

      elemDefault = new DynamicContent(0, "AAAAAAA", "AAAAAAA", "image/png", "AAAAAAA", false)
    })

    describe("Service methods", () => {
      it("should find an element", () => {
        const returnedFromService = Object.assign({}, elemDefault)

        service.find(123).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "GET" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(elemDefault)
      })

      it("should create a DynamicContent", () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        )

        const expected = Object.assign({}, returnedFromService)

        service.create(new DynamicContent()).subscribe(resp => (expectedResult = resp.body))

        const req = httpMock.expectOne({ method: "POST" })
        req.flush(returnedFromService)
        expect(expectedResult).toMatchObject(expected)
      })

      it("should update a DynamicContent", () => {
        const returnedFromService = Object.assign(
          {
            title: "BBBBBB",
            description: "BBBBBB",
            urlImg: "BBBBBB",
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

      it("should return a list of DynamicContent", () => {
        const returnedFromService = Object.assign(
          {
            title: "BBBBBB",
            description: "BBBBBB",
            urlImg: "BBBBBB",
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

      it("should delete a DynamicContent", () => {
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
