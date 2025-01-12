import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../state/user.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  loginForm!: FormGroup;
  isLoading:boolean = false;

  constructor(private router: Router, private store: Store){}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(form:any){
    this.authService.login(form.value.email, form.value.password).subscribe(res => {
      this.isLoading = true;
      if(!res){
        return;
      }
      this.store.dispatch(loginSuccess({ user: { email: res.user.email, name: res.user.name}, token: res.token}));
      this.router.navigate(['/dashboard']);
    })
    this.loginForm.reset();
  }
}
