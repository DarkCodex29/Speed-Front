import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from '../services';
import { takeUntil } from 'rxjs/operators';
import { SpinnerOverlayService } from '@speed/common/services';
@Component({
  selector: 'app-login-external',
  templateUrl: './login-external.component.html',
  styleUrls: ['./login-external.component.scss'],
})
export class LoginExternalComponent implements OnDestroy, OnInit {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public token?: string;
  public value = false;
  public error = false;

  public constructor(
    private router: Router,
    private loginService: LoginService,
    private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.loginExternal();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public loginExternal() {
    this.spinnerService.show();
    this.loginService
      .loginExternal({
        key: this.route.snapshot.params['key'],
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.error = false;
          this.spinnerService.hide();
          this.loginService.saveUser(response);
          localStorage.setItem('urlExternal', 'true');
          localStorage.setItem('idTraza', this.route.snapshot.params['idTraza']);
          this.router.navigateByUrl('/speed/final-user/contract-detail-external/' + this.route.snapshot.params['idTraza']);
        },
        error: (response) => {
          this.error = true;
          this.spinnerService.hide();
          console.error('ERROR', response);
        },
      });
  }
}
