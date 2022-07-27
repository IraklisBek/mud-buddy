import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from 'src/app/core/models/auth.model';
import { AuthApi } from '../../../core/api/auth.api'
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = {} as FormGroup
  constructor(
    private router: Router,
    private authApi: AuthApi
  ) { }

  ngOnInit() {
    this.initializeFormGroup();
  }

  private initializeFormGroup() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  /**
   * Listener of erros
   */
  get errorControl() {
    return this.loginForm.controls;
  }

  submitForm() {
    if (this.loginForm.invalid) {
      return;
    }
    let formValues = this.loginForm.value;
    let loginForm: LoginForm = {
      email: formValues.email,
      password: formValues.password
    }
    this.router.navigate(['/tabs/home'])
    // this.authApi.login(loginForm)
    //   .pipe(take(1))
    //   .subscribe(res => {
    //     console.log(res)
    //   })
  }
}
