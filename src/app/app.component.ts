import { Component, effect } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { DEFAULT_TRANSLATIONS_LANGUAGE } from './core/factories/html-translations-loading-factory/i18n.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent {
  title = 'angular-tour-of-heroes';

  constructor(private i18nService: TranslateService) {
    this.i18nService.setDefaultLang(DEFAULT_TRANSLATIONS_LANGUAGE);
    this.i18nService.use(DEFAULT_TRANSLATIONS_LANGUAGE);
  }

  switchLanguage(language: string): void {
    this.i18nService.use(language);
  }
}
