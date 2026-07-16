import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent, ErrorData } from '../../shared/components/error-dialog.component';

@Injectable({ providedIn: 'root' })
export class UserIdGuard implements CanActivate {
  constructor(private store: Store, private router: Router,private dialog: MatDialog) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const id = +route.paramMap.get('id')!;
    // Optionally check if user exists with id>10
    if (id > 10) {
      this.router.navigate(['/users']);
      this.dialog.open(ErrorDialogComponent, {
        data: {
          title: 'Error',
          message: `You can't access to Update user.\n\rPlease try with other user.`,
        } as ErrorData
      });
      return false;
    }
    return true;
  }
}
