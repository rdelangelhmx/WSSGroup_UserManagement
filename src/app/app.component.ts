import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserDataLoaded, selectLoading } from './store/user.selectors';
import * as UserActions from './store/user.actions';
import { UsDateFormatService } from './core/providers/us-date-format.service';
@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="!(userDataLoaded$ | async)" class="global-loading">
      <h1>Loading application data...</h1>
      <mat-spinner></mat-spinner>
    </div>
    <router-outlet *ngIf="userDataLoaded$ | async"></router-outlet>
  `,
  styles: [`
    .global-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit {
  userDataLoaded$: Observable<boolean>;

  constructor(private store: Store, private dateFormat: UsDateFormatService) {
    this.userDataLoaded$ = this.store.select(selectUserDataLoaded);
  }

  ngOnInit() {
    this.store.dispatch(UserActions.loadUserById({ id: 1 }));
  }
}
