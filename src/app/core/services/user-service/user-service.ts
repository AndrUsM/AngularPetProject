import { Injectable, signal, effect } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Role, UserDto } from '@core/models/user-dto';
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private roles = signal<Role[] | null>(null);
  private user = signal<UserDto | null>(null);

  constructor(
    private httpClient: HttpClient
  ) {
    this.fetchUser();
  }

  fetchUser(): Observable<UserDto | null> {
    return this.httpClient.get<UserDto>('/user/1').pipe(map((user) => {
      this.user.set(user);
      this.roles.set([user?.role as Role].filter(Boolean));

      return user;
    }));
  }

  public isAdmin(): boolean {
    return this.user()?.role === 'admin';
  }

}