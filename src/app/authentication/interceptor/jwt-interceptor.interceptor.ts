import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '@speed/env/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  private urlsToNotUse: Array<string>;

  public constructor(private router: Router) {
    this.urlsToNotUse = ['registrarExpediente/uploadFiles', 'elaborarDocumento/uploadFiles', 'adjuntarFirmado/uploadFiles'];
  }

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = localStorage.getItem('token') || '';
    let request = req;
    if (token != null) {
      if (this.isValidRequestForInterceptor(request.url)) {
        request = req.clone({
          setHeaders: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } else {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`,
          },
        });
      }
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          localStorage.clear();
          this.router.navigateByUrl('/login');
        }

        return throwError(() => err);
      }),
    );
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    const positionIndicator = environment.apiUrl.concat('/');
    const position = requestUrl.indexOf(positionIndicator);

    if (position >= 0) {
      const destination: string = requestUrl.substring(position + positionIndicator.length);
      for (const address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}
