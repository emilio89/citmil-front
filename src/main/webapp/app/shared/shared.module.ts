import { NgModule } from "@angular/core"
import { CitmilSharedLibsModule } from "./shared-libs.module"
import { FindLanguageFromKeyPipe } from "./language/find-language-from-key.pipe"
import { AlertComponent } from "./alert/alert.component"
import { AlertErrorComponent } from "./alert/alert-error.component"
import { LoginModalComponent } from "./login/login.component"
import { HasAnyAuthorityDirective } from "./auth/has-any-authority.directive"
import { JhMaterialModule } from "./jh-material.module"

@NgModule({
  imports: [JhMaterialModule, CitmilSharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, LoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [LoginModalComponent],
  exports: [JhMaterialModule, CitmilSharedLibsModule, FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, LoginModalComponent, HasAnyAuthorityDirective]
})
export class CitmilSharedModule {}
