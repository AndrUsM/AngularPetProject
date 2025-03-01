
import { HttpClient } from "@angular/common/http";

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TRANSLATIONS_ASSETS_PATH } from './i18n.config';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, TRANSLATIONS_ASSETS_PATH, '.json');
}