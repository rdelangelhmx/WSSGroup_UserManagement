import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class UserIdGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const id = +route.paramMap.get('id')!;
    // Optionally check if user exists with id>10
    if (id > 10) {
      this.router.navigate(['/users']);
      return false;
    }
    return true;
  }
}
