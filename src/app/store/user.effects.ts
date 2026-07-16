import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UserApiService } from '../core/services/userapi.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private api: UserApiService, private router: Router) {}

  navigateAfterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUserSuccess, UserActions.updateUserSuccess, UserActions.deleteUserSuccess),
      tap(() => this.router.navigate(['/users']))
    ),
    { dispatch: false }
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.api.getAll().pipe(
          map(res => UserActions.loadUsersSuccess({ users: res.users })),
          catchError(err => of(UserActions.loadUsersFailure({ error: err.message })))
        )
      )
    )
  );

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserById),
      mergeMap(({ id }) =>
        this.api.getById(id).pipe(
          map(user => UserActions.loadUserByIdSuccess({ user })),
          catchError(err => of(UserActions.loadUserByIdFailure({ error: err.message })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(({ user }) =>
        this.api.create(user).pipe(
          map(newUser => UserActions.createUserSuccess({ user: newUser })),
          catchError(err => of(UserActions.createUserFailure({ error: err.message })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ id, user }) =>
        this.api.update(id, user).pipe(
          map(updated => UserActions.updateUserSuccess({ user: updated })),
          catchError(err => of(UserActions.updateUserFailure({ error: err.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ id }) =>
        this.api.delete(id).pipe(
          map(() => UserActions.deleteUserSuccess({ id })),
          catchError(err => of(UserActions.deleteUserFailure({ error: err.message })))
        )
      )
    )
  );
}
