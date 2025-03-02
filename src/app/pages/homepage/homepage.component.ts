
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserDto } from '@core/models/user-dto';
import { UserService } from '@core/services/user-service/user-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: false,
})
export class HomePageComponent {
  private ngUnsubscribe = new Subject<void>();
  private user$ = signal<UserDto | null>(null);

  public personalInformationFormSection = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
    ]),
    surname: new FormControl<string>('', [
      Validators.required,
    ]),
    email: new FormControl<string>('', [
      Validators.email,
    ]),
    age: new FormControl<number | null>(null, [
      Validators.min(0),
      Validators.max(200)
    ])
  });

  public paymentFormSection = new FormGroup({
    cardNumber: new FormControl<string>('', [
      Validators.required,
    ]),
    hasCredits: new FormControl<boolean>(false),
  })

  public formGroup = new FormGroup({
    personalInfo: this.personalInformationFormSection,
    paymentInfo: this.paymentFormSection,
  });

  constructor(
    private userService: UserService
  ) {
    this.userService.fetchUser()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (user) => {
          this.user$.set(user);
        }
      })
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.ngUnsubscribe.unsubscribe();
  }

  public getControl(path: string) {
    return this.formGroup.get(path) as FormControl;
  }
}