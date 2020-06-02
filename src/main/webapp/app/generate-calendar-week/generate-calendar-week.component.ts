import { UserService } from "./../core/user/user.service"
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from "@angular/core"
import { FormControl } from "@angular/forms"
import { ReplaySubject, Subject } from "rxjs"
import { MatSelect } from "@angular/material/select"
import { takeUntil, take } from "rxjs/operators"
import { HttpResponse } from "@angular/common/http"
import { User } from "app/core/user/user.model"

@Component({
  selector: "jhi-generate-calendar-week",
  templateUrl: "./generate-calendar-week.component.html",
  styleUrls: ["generate-calendar-week.component.scss"]
})
export class GenerateCalendarWeekComponent implements OnInit, OnDestroy, AfterViewInit, OnDestroy {
  message: string
  totalItems = 0
  users: User[] | null = null

  /** control for the selected bank for multi-selection */
  public userMultiCtrl: FormControl = new FormControl()

  /** control for the MatSelect filter keyword multi-selection */
  public userMultiFilterCtrl: FormControl = new FormControl()

  /** list of banks filtered by search keyword */
  public filteredUsersMulti: ReplaySubject<User[]> = new ReplaySubject<User[]>(1)

  @ViewChild("multiSelect", { static: true }) multiSelect: MatSelect

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>()

  constructor(private userService: UserService) {}

  ngOnInit() {
    // initialize users
    this.loadUsers()
    // load the initial user list

    // listen for search field value changes
    this.userMultiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterBanksMulti()
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
    console.error(response)
    this.users = response.body
    console.error(this.users)
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
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredUsersMulti.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
      // setting the compareWith property to a comparison function
      // triggers initializing the selection according to the initial value of
      // the form control (i.e. _initializeSelection())
      // this needs to be done after the filteredBanks are loaded initially
      // and after the mat-option elements are available
      this.multiSelect.compareWith = (a: User, b: User) => a && b && a.id === b.id
    })
  }

  protected filterBanksMulti() {
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
    // filter the banks
    this.filteredUsersMulti.next(this.users.filter(user => user.firstName.toLowerCase().includes(search)))
  }

  remove(user: User): void {
    const index = this.userMultiCtrl?.value.indexOf(user)

    if (index >= 0) {
      this.userMultiCtrl?.value.splice(index, 1)
    }
  }
}
