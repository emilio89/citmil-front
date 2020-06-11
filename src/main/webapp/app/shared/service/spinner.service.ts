import { Injectable } from "@angular/core"
import { NgxSpinnerService } from "ngx-spinner"
import { Spinner } from "ngx-spinner/lib/ngx-spinner.enum"

@Injectable({
  providedIn: "root"
})
export class SpinnerService {
  taskShowSpinner: any

  constructor(public ngxSpinnerService: NgxSpinnerService) {}

  showSpinner(name?: string, options?: Spinner) {
    if (this.taskShowSpinner === undefined) {
      this.taskShowSpinner = setTimeout(() => {
        this.ngxSpinnerService.show(name, options)
      }, 300)
    }
  }

  hideSpinner(name?: string) {
    if (this.taskShowSpinner) {
      clearTimeout(this.taskShowSpinner)
      delete this.taskShowSpinner
    }
    this.ngxSpinnerService.hide(name)
  }
}
