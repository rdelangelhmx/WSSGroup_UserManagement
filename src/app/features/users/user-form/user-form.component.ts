import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Role } from '../../../shared/enums/Role.enum';
import * as UserActions from '../../../store/user.actions';
import { selectSelectedUser, selectLoading } from '../../../store/user.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEdit = false;
  userId: number | null = null;
  loading$: Observable<boolean>;
  roles = Object.values(Role);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loading$ = this.store.select(selectLoading);
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.userId = +id;
        this.store.dispatch(UserActions.selectUser({ id: this.userId }));
        this.store.select(selectSelectedUser).subscribe(user => {
          if (user) {
            this.userForm.patchValue(user);
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    const user = this.userForm.value;
    if (this.isEdit && this.userId) {
      this.store.dispatch(UserActions.updateUser({ id: this.userId, user }));
    } else {
      this.store.dispatch(UserActions.createUser({ user }));
    }
    // After success, navigate back (we can listen to success actions but for simplicity we navigate after a delay or via effect)
    // Better: use a Effect that navigates on success, or subscribe to store.
    // We'll implement an effect for navigation in a moment.
    this.router.navigate(['/users']);
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
