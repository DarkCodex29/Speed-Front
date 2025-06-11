import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from '../services';
import { Utils } from '@speed/common/helpers';
import { takeUntil } from 'rxjs/operators';
import { SpinnerOverlayService } from '@speed/common/services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public token?: string;
  public value = false;
  public error = false;
  public form = this.fb.group({
    username: [localStorage.getItem('user'), [Validators.required]],
    password: ['', [Validators.required]],
    value: [false],
  });
  public showPassword = false;

  public constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private spinnerService: SpinnerOverlayService,
  ) {}

  public ngOnDestroy(): void {
    this.spinnerService.hide();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public submit() {
    Utils.validateAllFields(this.form);
    if (this.form.valid) {
      this.spinnerService.show();
      this.loginService.logout();
      this.loginService
        .login(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.error = false;
            this.spinnerService.hide();
            this.loginService.saveUser(response);
            this.router.navigateByUrl('/speed');
          },
          error: (response) => {
            this.error = true;
            this.spinnerService.hide();
            console.error('ERROR', response);
          },
        });
    }
  }

  handleKeyUp(e: KeyboardEvent){
    if(e.key === 'Enter'){
       this.submit();
    }
  }

  public onClickedShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
