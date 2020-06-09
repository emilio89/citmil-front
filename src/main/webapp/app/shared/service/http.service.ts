import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { SpinnerService } from "./spinner.service"

@Injectable({
  providedIn: "root"
})
export class HttpService {
  taskShowSpinner: any

  constructor(public httpClient: HttpClient, public spinnerService: SpinnerService) {}

  get(url: string, options: any = {}): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.spinnerService.showSpinner()
      this.httpClient.get(url, options).subscribe(
        (data: any) => {
          this.spinnerService.hideSpinner()
          resolve(data)
        },
        error => {
          this.spinnerService.hideSpinner()
          reject(error)
        }
      )
    })
  }

  post(url: string, params: any, options: any = {}): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.spinnerService.showSpinner()
      this.httpClient.post(url, params, options).subscribe(
        (data: any) => {
          this.spinnerService.hideSpinner()
          resolve(data)
        },
        error => {
          this.spinnerService.hideSpinner()
          reject(error)
        }
      )
    })
  }

  put(url: string, params: any, options: any = {}): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.spinnerService.showSpinner()
      this.httpClient.put(url, params, options).subscribe(
        (data: any) => {
          this.spinnerService.hideSpinner()
          resolve(data)
        },
        error => {
          this.spinnerService.hideSpinner()
          reject(error)
        }
      )
    })
  }

  delete(url: string, options: any = {}): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.spinnerService.showSpinner()
      this.httpClient.delete(url, options).subscribe(
        (data: any) => {
          this.spinnerService.hideSpinner()
          resolve(data)
        },
        error => {
          this.spinnerService.hideSpinner()
          reject(error)
        }
      )
    })
  }

  patch(url: string, params: any, options: any = {}): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.spinnerService.showSpinner()
      this.httpClient.patch(url, params, options).subscribe(
        (data: any) => {
          this.spinnerService.hideSpinner()
          resolve(data)
        },
        error => {
          this.spinnerService.hideSpinner()
          reject(error)
        }
      )
    })
  }
}
