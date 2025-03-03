import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { APP_ROUTING } from "./app-routing.config";

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTING)],
  exports: [RouterModule],
})
export class AppRoutingModule { }