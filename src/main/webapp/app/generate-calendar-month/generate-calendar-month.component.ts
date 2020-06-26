import { IGenerateCalendarMonth } from "./../interface/generate-calendar-month"
import { ITimeBandDay } from "./../interface/time-band.model"
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from "@angular/core"
import { FormBuilder, FormArray, FormControl, Validators } from "@angular/forms"
import * as moment from "moment"
import { ReplaySubject, Subject } from "rxjs"
import { User } from "app/core/user/user.model"
import { takeUntil, take } from "rxjs/operators"
import { MatSnackBarConfig, MatSnackBar } from "@angular/material/snack-bar"
import { HttpResponse } from "@angular/common/http"
import { UserService } from "app/core/user/user.service"
import { MatDatepicker } from "@angular/material/datepicker"
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material/core"
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter"
import { MatSelect } from "@angular/material/select"
import { GenerateCalendarMonthsService } from "./generate-calendar-month.service"
import { DialogoConfirmacionComponent } from "app/components/dialogo-confirmacion/dialogo-confirmacion.component"
import { MatDialog } from "@angular/material/dialog"

export const MY_FORMATS = {
  parse: {
    dateInput: "MMMM"
  },
  display: {
    dateInput: "MMMM",
    monthYearLabel: "MMMM",
    monthYearA11yLabel: "MMMM"
  }
}

@Component({
  selector: "jhi-generate-calendar-month",
  templateUrl: "./generate-calendar-month.component.html",
  styleUrls: ["generate-calendar-month.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class GenerateCalendarMonthComponent implements OnInit, OnDestroy, AfterViewInit, OnDestroy {
  isLinear = false
  users: User[] | null = null
  monthCtrl = new FormControl(moment())
  daysOfWeek = [
    { number: 1, day: "Lunes" },
    { number: 2, day: "Martes" },
    { number: 3, day: "Miércoles" },
    { number: 4, day: "Jueves" },
    { number: 5, day: "Viernes" },
    { number: 6, day: "Sábado" },
    { number: 7, day: "Domingo" }
  ]
  @ViewChild("multiSelect", { static: true }) multiSelect: MatSelect

  generateCalendarMonthForm = this.formBuilder.group({
    users: [],
    month: moment(),
    timeBandsDay: new FormArray([])
  })
  public userMultiFilterCtrl: FormControl = new FormControl()
  /** control for the selected user for multi-selection */
  public userMultiCtrl: FormControl = new FormControl()

  /** list of user filtered by search keyword */
  public filteredUsersMulti: ReplaySubject<User[]> = new ReplaySubject<User[]>(1)
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>()

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private generateMonthService: GenerateCalendarMonthsService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadUsers()

    this.userMultiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterUsersMulti()
    })

    this.t.push(
      this.formBuilder.group({
        dayOfWeekId: ["", Validators.required],
        start: ["", Validators.required],
        end: ["", Validators.required]
      })
    )
  }

  ngAfterViewInit() {
    this.setInitialValue()
  }

  ngOnDestroy() {
    this._onDestroy.next()
    this._onDestroy.complete()
  }

  toggleSelectAll(selectAllValue: boolean) {
    this.filteredUsersMulti.pipe(take(1), takeUntil(this._onDestroy)).subscribe(val => {
      if (selectAllValue) {
        this.userMultiCtrl.patchValue(val)
      } else {
        this.userMultiCtrl.patchValue([])
      }
    })
  }
  /**
   * Sets the initial value after the filtered Users are loaded initially
   */
  protected setInitialValue() {
    this.filteredUsersMulti.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      // setting the compareWith property to a comparison function
      // triggers initializing the selection according to the initial value of
      // the form control (i.e. _initializeSelection())
      // this needs to be done after the filteredUsers are loaded initially
      // and after the mat-option elements are available
      this.multiSelect.compareWith = (a: User, b: User) => a && b && a.id === b.id
    })
  }

  async loadUsers() {
    const response: HttpResponse<User[]> = await this.userService
      .getProfesionalesCompany({
        page: 0,
        size: 5000,
        sort: ["lastName"]
      })
      .toPromise()
    this.users = response.body
    this.filteredUsersMulti.next(this.users.slice())
  }
  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    /* eslint-disable no-console */

    const ctrlValue = this.monthCtrl.value
    const month = moment(normalizedMonth).month()
    ctrlValue.month(month)
    this.monthCtrl.setValue(ctrlValue)
    datepicker.close()
  }

  checkHours(timeBandsDays: ITimeBandDay[]): boolean {
    /* eslint-disable no-console */

    let correctHours = true
    timeBandsDays.forEach(timeBandDay => {
      // Inicializo las horas para comparar
      const dtend = moment("2020-01-01" + " " + timeBandDay.end)
      const dtstart = moment("2020-01-01" + " " + timeBandDay.start)
      if (dtend.isBefore(dtstart)) {
        correctHours = false
      }
    })
    return correctHours
  }
  remove(user: User): void {
    const index = this.userMultiCtrl?.value.indexOf(user)

    if (index >= 0) {
      this.userMultiCtrl?.value.splice(index, 1)
    }
  }
  groupBy2 = (OurArray, property) => {
    return OurArray.reduce((accumulator, object) => {
      const key = object[property]
      // using ternary operator to make it shorter but in this case it is not necessary as it might look complicated
      !accumulator[key] ? (accumulator[key] = []) : accumulator[key].push(object)
      return accumulator
    }, {})
  }

  groupBy(OurArray, property) {
    return OurArray.reduce(function(accumulator, object) {
      // get the value of our object(age in our case) to use for group    the array as the array key
      const key = object[property]
      // if the current value is similar to the key(age) don't accumulate the transformed array and leave it empty
      if (!accumulator[key]) {
        accumulator[key] = []
      }
      // add the value to the array
      accumulator[key].push(object)
      // return the transformed array
      return accumulator
      // Also we also set the initial value of reduce() to an empty object
    }, {})
  }

  generateCalendarMonth() {
    if (this.checkHours(this.generateCalendarMonthForm.get("timeBandsDay").value)) {
      this.dialog
        .open(DialogoConfirmacionComponent, {
          data: `Estas seguro que deseas generar el calendario para el mes y profesionales seleccionados?`
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.generateCalendarMonthForm.patchValue({ users: this.userMultiCtrl.value })

            const timebandsIterator = this.generateCalendarMonthForm.get("timeBandsDay").value
            const timeBandsDays = []
            timebandsIterator.forEach(element => {
              timeBandsDays.push({ day: element.dayOfWeekId, timeBand: { start: element.start, end: element.end } })
            })
            const result = timeBandsDays.reduce(function(r, a) {
              r[a.day.number] = r[a.day.number] || []
              r[a.day.number].push(a)
              return r
            }, Object.create(null))

            const sentInterfaceBack: IGenerateCalendarMonth = {
              users: this.userMultiCtrl.value,
              month: this.monthCtrl.value,
              days: result
            }
            this.generateMonthService.generateCalendarMonths(sentInterfaceBack)
          }
        })
    } else {
      const config = new MatSnackBarConfig()
      config.duration = 2000
      config.panelClass = ["bg-danger"]

      this._snackBar.open("La hora de fin es anterior a la hora de inicio", undefined, config)
    }
  }

  protected filterUsersMulti() {
    if (!this.users) {
      return
    }
    // get the search keyword
    let search = this.userMultiFilterCtrl.value
    if (!search) {
      this.filteredUsersMulti.next(this.users.slice())
      return
    } else {
      search = search.toLowerCase()
    }
    // filter the users
    this.filteredUsersMulti.next(this.users.filter(user => user.firstName.toLowerCase().includes(search)))
  }
  get f() {
    return this.generateCalendarMonthForm.controls
  }
  get t() {
    return this.f.timeBandsDay as FormArray
  }

  addOtherDay(): void {
    this.t.push(
      this.formBuilder.group({
        dayOfWeekId: ["", Validators.required],
        start: ["", Validators.required],
        end: ["", Validators.required]
      })
    )
  }

  deleteLastDay(): void {
    this.t.removeAt(this.t.controls.length - 1)
  }
}
