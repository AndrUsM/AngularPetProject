import { NgModule, provideZoneChangeDetection } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouterOutlet } from "@angular/router";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { CommonModule } from "@angular/common";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    provideZoneChangeDetection(
      { eventCoalescing: true }),
      {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: { appearance: 'fill' }
      },
      provideAnimations(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }