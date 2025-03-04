import { Routes } from '@angular/router';
import { AuthGuard } from '@core/services/auth-guard/auth-guard';
import { AppGuard } from '@core/services/app-guard/app-guard';

import { HomePageComponent } from '../pages/private-pages/homepage/homepage.component';
import { LoginComponent } from 'app/pages/auth/login/login.component';
import { AppComponent } from 'app/app.component';
import { RecipesComponent } from 'app/pages/private-pages/recipes/recipes.component';


export const APP_ROUTING: Routes = [
  {
    path: 'auth',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ],
  },
  {
    path: 'app',
    canActivateChild: [AppGuard],
    children: [
      {
        path: 'homepage',
        component: HomePageComponent
      },
      {
        path: 'recipes',
        component: RecipesComponent,
      },
      {
        path: '**',
        redirectTo: 'homepage'
      }
    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'auth/login' }
];