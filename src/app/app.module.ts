import { HttpClient, provideHttpClient, withFetch } from "@angular/common/http";
import { NgModule, provideExperimentalZonelessChangeDetection, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ServiceWorkerModule } from '@angular/service-worker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { HttpLoaderFactory } from "./core/factories/html-translations-loading-factory/html-translations-loading-factory";



@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    // provideZoneChangeDetection(
    //   { eventCoalescing: true }
    // ),
    provideExperimentalZonelessChangeDetection(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    },
    TranslateService,
    provideAnimations(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }