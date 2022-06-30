import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterForm } from 'src/app/core/models/auth.model';
import { AuthApi } from '../../../core/api/auth.api'
import { take } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup = {} as FormGroup
  private subs = new SubSink();
  passwordsMissmatch: boolean = false;
  constructor(
    private router: Router,
    private authApi: AuthApi
  ) { }

  ngOnInit() {
    this.initializeFormGroup();
  }

  private initializeFormGroup() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      confirm: new FormControl(null, {
        validators: [Validators.required]
      }),
      organisation: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.subs.sink = this.registerForm.valueChanges.subscribe(res=>{
      if(res.confirm !== res.password) {
        this.passwordsMissmatch = true;
      } else{
        this.passwordsMissmatch = false;
      }
    })
  }

  /**
   * Listener of erros
   */
  get errorControl() {
    return this.registerForm.controls;
  }

  submitForm() {
    if (this.registerForm.invalid) {
      return;
    }
    let formValues = this.registerForm.value;
    let registerForm: RegisterForm = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      organisation: formValues.organisation
    }
    this.router.navigate(['/auth/login'])
    // this.authApi.register(registerForm)
      // .pipe(take(1))
      // .subscribe(res => {
      //   console.log(res)
      // })
  }
}
