import { Injectable, signal, OnDestroy, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, Subject, map, skipWhile, takeUntil, takeWhile } from "rxjs";

import { Role, UserDto } from '@core/models/user-dto';
import { SessionStorageService } from "@core/services/session-storage-service/session-storage-service";
import { BaseUserDto } from "@core/models/user-base-dto";

import { UserLoginDto } from "@features/users/models/user-login-dto";
import { UserLoginResponse } from "@features/users/models/user-login-response";
import { UserFefetchResponse } from "@features/users/models/user-refetch-auth-response";

import { convertHoursToMinutes } from "@shared/utils/parse-hours-to-minutes";
import { mapUserTpBaseUserInfo } from "@shared/utils/map-user-to-base-user-info";

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  private readonly sessionStorageService = inject(SessionStorageService);

  public roles = signal<Role[]>([]);
  public user = signal<UserDto | null>(this.sessionStorageService.getItem('base-user-info'));
  private accessToken = signal<string | null>(this.sessionStorageService.getItem('auth-access-token'));
  private refreshToken = signal<string | null>(this.sessionStorageService.getItem('auth-refresh-token'));
  private TOKEN_EXPIRATION_TIME = convertHoursToMinutes(2);

  constructor(
    private httpClient: HttpClient
  ) { }

  public fetchUser(userId: string): Observable<UserDto | null> {
    return this.httpClient.get<UserLoginResponse>(`/user/${userId}`)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((userLoginResponse) => {
          const { accessToken, refreshToken, ...user } = userLoginResponse;

          this.user.set(user);
          this.roles.set([user?.role as Role].filter(Boolean));
          this.accessToken.set(accessToken ?? null);
          this.refreshToken.set(refreshToken ?? null);

          this.saveAuthAndUserDataToSessionStorage(
            {
              accessToken,
              refreshToken,
              ...user
            }
          );

          return user;
        }));
  }

  public getAuthorizedUser(): Observable<UserDto | null> {
    return this.httpClient.get<UserDto>(`auth/me`)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        takeWhile(() => Boolean(this.refreshToken())),
        map((user) => {
          this.user.set(user);
          this.roles.set([user?.role as Role].filter(Boolean));
          this.saveUserDataToSessionStorage(user);

          return user;
        }));
  }

  private saveTokensToSessionStorage({ accessToken, refreshToken }: UserFefetchResponse): void {
    this.sessionStorageService.setItem('auth-access-token', accessToken);
    this.sessionStorageService.setItem('auth-refresh-token', refreshToken);
  }

  private saveAuthAndUserDataToSessionStorage({ accessToken, refreshToken, ...user }: UserLoginResponse): void {
    this.saveTokensToSessionStorage({ accessToken, refreshToken });
    this.saveUserDataToSessionStorage(user);
  }

  public saveUserDataToSessionStorage(user: UserDto): void {
    this.sessionStorageService.setItem(
      'base-user-info',
      JSON.stringify(mapUserTpBaseUserInfo(user))
    );
  }

  public refetchAuthSession(): void {
    this.httpClient.post<UserFefetchResponse>('auth/refetch', {
      refreshToken: this.refreshToken,
      expiresInMins: this.TOKEN_EXPIRATION_TIME,
    })
      .pipe(
        takeUntil(this.ngUnsubscribe),
        takeWhile((value) => Boolean(value?.accessToken && value.refreshToken))
      )
      .subscribe({
        next: (response) => {
          this.accessToken.set(response?.accessToken ?? null);
          this.accessToken.set(response?.accessToken ?? null);

          this.saveTokensToSessionStorage(response);
        }
      })
  }

  public login(user: UserLoginDto): Observable<UserDto | null> {
    return this.httpClient.post<UserLoginResponse>('api/auth/login', {
      ...user,
      expiresInMins: convertHoursToMinutes(2),
    })
      .pipe(
        takeUntil(this.ngUnsubscribe),
        skipWhile((maybeUser) => !maybeUser),
        map((maybeUser: UserLoginResponse) => {
          this.user.set(maybeUser as UserDto);
          this.saveAuthAndUserDataToSessionStorage(maybeUser);

          return maybeUser;
        })
      );
  }

  public getBaseUser(): BaseUserDto | null {
    return this.user()
      ? mapUserTpBaseUserInfo(this.user()!)
      : JSON.parse(
        this.sessionStorageService.getItem(
          'base-user-info')
      )
  }

  public isAdmin(): boolean {
    return this.user()?.role === 'admin';
  }

  ngOnDestroy() {
    this.ngUnsubscribe.unsubscribe();
  }
}