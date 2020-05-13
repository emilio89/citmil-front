import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core"
import { Subscription } from "rxjs"

import { AccountService } from "app/core/auth/account.service"
import { Account } from "app/core/user/account.model"
import { LoginService } from "app/core/login/login.service"
import { Router } from "@angular/router"
import { FormBuilder } from "@angular/forms"

@Component({
  selector: "jhi-home",
  templateUrl: "./home.component.html",
  styleUrls: ["home.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null
  authSubscription?: Subscription
  @ViewChild("username", { static: false })
  username?: ElementRef

  authenticationError = false

  loginForm = this.fb.group({
    username: [""],
    password: [""],
    rememberMe: [false]
  })

  constructor(private accountService: AccountService, private loginService: LoginService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account))
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated()
  }

  cancel(): void {
    this.authenticationError = false
    this.loginForm.patchValue({
      username: "",
      password: ""
    })
  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get("username")!.value,
        password: this.loginForm.get("password")!.value,
        rememberMe: this.loginForm.get("rememberMe")!.value
      })
      .subscribe(
        () => {
          this.authenticationError = false
          if (this.router.url === "/account/register" || this.router.url.startsWith("/account/activate") || this.router.url.startsWith("/account/reset/")) {
            this.router.navigate([""])
          }
        },
        () => (this.authenticationError = true)
      )
  }

  register(): void {
    this.router.navigate(["/account/register"])
  }

  requestResetPassword(): void {
    this.router.navigate(["/account/reset", "request"])
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }
}
