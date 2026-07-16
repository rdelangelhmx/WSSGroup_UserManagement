import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/User.model';
import * as UserActions from '../../../store/user.actions';
import { selectAllUsers, selectLoading } from '../../../store/user.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationData } from '../../../shared/components/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  deleteUser(id: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete user "${name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      } as ConfirmationData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(UserActions.deleteUser({ id }));
      }
    });
  }

  // editUser(id: number) {
  //    this.store.dispatch(UserActions.loadUserById({ id }));
  // }
}
