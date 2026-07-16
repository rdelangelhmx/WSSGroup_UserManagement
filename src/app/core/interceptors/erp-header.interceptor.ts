import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorData, ErrorDialogComponent } from '../../shared/components/error-dialog.component';

@Injectable()
export class ErpHeaderInterceptor implements HttpInterceptor {
  constructor(private readonly dialog: MatDialog) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: { 'X-ERP-APP': 'testing' }
    });
    return next.handle(modifiedReq)
      .pipe(
        catchError((error) => {
          console.error(`Error Http Status: ${error.status}`, error);
          this.dialog.open(ErrorDialogComponent, {
            data: {
              title: 'HttpRequest Error',
              message: `An unexpected error occurred: ${error.message}.\n\rPlease try again later.`,
            } as ErrorData
          });
          return throwError(() => error);
        })
      );
  }
}
