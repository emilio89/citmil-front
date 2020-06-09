import { IGenerateCalendarWeek } from "./../interface/generate-calendar-week"
import { ITimeBandDay } from "./../interface/time-band.model"
import { UserService } from "./../core/user/user.service"
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from "@angular/core"
import { FormControl, FormBuilder, FormArray, Validators } from "@angular/forms"
import { ReplaySubject, Subject } from "rxjs"
import { MatSelect } from "@angular/material/select"
import { takeUntil, take } from "rxjs/operators"
import { HttpResponse } from "@angular/common/http"
import { User } from "app/core/user/user.model"
import * as moment from "moment"
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar"
import { GenerateCalendarWeekService } from "./generate-calendar-week.service"

@Component({
  selector: "jhi-generate-calendar-week",
  templateUrl: "./generate-calendar-week.component.html",
  styleUrls: ["generate-calendar-week.component.scss"]
})
export class GenerateCalendarWeekComponent implements OnInit, OnDestroy, AfterViewInit, OnDestroy {
  message: string
  totalItems = 0
  users: User[] | null = null
  days = [
    { number: 1, day: "Lunes" },
    { number: 2, day: "Martes" },
    { number: 3, day: "Miércoles" },
    { number: 4, day: "Jueves" },
    { number: 5, day: "Viernes" },
    { number: 6, day: "Sábado" },
    { number: 7, day: "Domingo" }
  ]
  daysAdd = [1]
  /** control for the selected user for multi-selection */
  public userMultiCtrl: FormControl = new FormControl()

  generateWeekForm = this.fb.group({
    users: [],
    startWeek: [],
    timeBandsDay: new FormArray([])
  })

  /** control for the MatSelect filter keyword multi-selection */
  public userMultiFilterCtrl: FormControl = new FormControl()

  /** list of user filtered by search keyword */
  public filteredUsersMulti: ReplaySubject<User[]> = new ReplaySubject<User[]>(1)

  @ViewChild("multiSelect", { static: true }) multiSelect: MatSelect

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>()

  constructor(private userService: UserService, private fb: FormBuilder, private _snackBar: MatSnackBar, private generateCalendarWeekService: GenerateCalendarWeekService) {}

  ngOnInit() {
    this.loadUsers()

    this.userMultiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterUsersMulti()
    })
    this.t.push(
      this.fb.group({
        day: ["", Validators.required],
        start: ["", Validators.required],
        end: ["", Validators.required]
      })
    )
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

  remove(user: User): void {
    const index = this.userMultiCtrl?.value.indexOf(user)

    if (index >= 0) {
      this.userMultiCtrl?.value.splice(index, 1)
    }
  }
  // convenience getters for easy access to form fields
  get f() {
    return this.generateWeekForm.controls
  }
  get t() {
    return this.f.timeBandsDay as FormArray
  }

  addOtherDay(): void {
    this.t.push(
      this.fb.group({
        day: ["", Validators.required],
        start: ["", Validators.required],
        end: ["", Validators.required]
      })
    )
  }

  deleteLastDay(): void {
    this.t.removeAt(this.t.controls.length - 1)
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
  generateWeek() {
    if (this.checkHours(this.generateWeekForm.get("timeBandsDay").value)) {
      this.generateWeekForm.patchValue({ users: this.userMultiCtrl.value })
      // send this.generateWeekForm
      const data: IGenerateCalendarWeek = {
        users: this.generateWeekForm.value.users,
        timeBandsDay: this.generateWeekForm.value.timeBandsDay
      }

      this.generateCalendarWeekService.generateCalendarWeek(data)
    } else {
      const config = new MatSnackBarConfig()
      config.duration = 2000
      config.panelClass = ["bg-danger"]

      this._snackBar.open("La hora de fin es anterior a la hora de inicio", undefined, config)
    }
  }
}
