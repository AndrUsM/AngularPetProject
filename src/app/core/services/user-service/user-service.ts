import { Injectable, signal, effect } from "@angular/core";

import { RequestService } from "../request-sevice/request-service";
import { Role, UserDto } from "../../models/user-dto";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private roles = signal<Role[] | null>(null);
  private user = signal<UserDto | null>(null);

  constructor(
    private _requestService: RequestService
  ) {
    this.getUser();
  }

  getUser(): UserDto | null {
    const data = this._requestService.fetch<UserDto>('/user/1');
    const maybeUser = data?.value() ?? null;

    this.user.set(maybeUser);
    this.roles.set([maybeUser?.role as Role].filter(Boolean));

    return maybeUser;
  }

  public isAdmin(): boolean {
    return this.user()?.role === 'admin';
  }

}