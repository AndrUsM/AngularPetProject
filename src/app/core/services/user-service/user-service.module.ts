import { NgModule } from "@angular/core";
import { UserService } from "./user-service";
import { BrowserModule } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";

@NgModule({
  declarations: [UserService],
  imports: [
    BrowserModule,
  ],
  providers: [
    provideHttpClient()
  ]
})
export class UserServiceModule { }