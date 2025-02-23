import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { APP_ROUTING } from "./app-routing.config";
import { HomepageModule } from "../pages/homepage/homepage.module";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTING)],
  exports: [RouterModule],
})
export class AppRoutingModule { }