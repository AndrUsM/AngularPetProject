import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { UserLoginDto } from "@features/users/models/user-login-dto";
import { UserService } from "@core/services/user-service/user-service";
import { Subject, takeUntil, takeWhile } from "rxjs";

@Component({
  selector: 'login-page',
  standalone: true,
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UserService,
    Router,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class LoginComponent {
  private ngUnsubscribe = new Subject<void>();

  public loginFormSchema = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
    ]),
    password: new FormControl<string>('', [
      Validators.required,
    ]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.userService.getAuthorizedUser()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        takeWhile(Boolean)
      )
      .subscribe({
        next: () => {
          this.navigateToHomepage();
        }
      })
  }

  private navigateToHomepage(): void {
    this.router.navigate(['app/homepage']);
  }

  public handleSubmit() {
    if (this.loginFormSchema.valid) {
      this.userService.login(this.loginFormSchema.value as UserLoginDto)
        .subscribe({
          next: () => {
            this.navigateToHomepage();
          }
        })
    }
  }
}