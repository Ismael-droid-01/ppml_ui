import { ChangeDetectorRef, Component, inject, NgZone } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngxs/store';
import { Login } from '@components/login/login.actions';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, delay, delayWhen, finalize, timer } from 'rxjs';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  private store = inject(Store);
  private router = inject(Router);


  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  // isLoading: boolean = false;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  public onLogin(){    
    this.loadingSubject.next(true);
    // This is only for demonstration purposes. Remove this line in production code to avoid logging sensitive information.
    console.log(`Login button clicked with username: ${this.username.value} and password: ${this.password.value}`); 
    const usernameValue = this.username.value;
    const passwordValue = this.password.value;

    const obs = this.store.dispatch(new Login(usernameValue!, passwordValue!));

    obs.pipe(
      finalize(() => {
        timer(1400).subscribe(() => {
          this.loadingSubject.next(false);
          console.log('Loading state reset after delay');
        });
      }),
    ).subscribe({
      next: () => {
        console.log('Login successful, navigating to home page...');
        this.router.navigate(['/model-config']); // Ensure navigation happens within Angular's zone
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.username.setErrors({ backendError: true });
        this.password.setErrors({ backendError: true });
      }
    });


  }
}
