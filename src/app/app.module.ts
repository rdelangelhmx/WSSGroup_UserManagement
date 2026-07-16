import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { UserFormComponent } from './features/users/user-form/user-form.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog.component';
import { ErrorDialogComponent } from './shared/components/error-dialog.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErpHeaderInterceptor } from './core/interceptors/erp-header.interceptor';
import { UsDateFormatService } from './core/providers/us-date-format.service';
import { GlobalErrorHandler } from './core/providers/globalError.handler';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({ users: userReducer }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ErpHeaderInterceptor, multi: true },
    UsDateFormatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
