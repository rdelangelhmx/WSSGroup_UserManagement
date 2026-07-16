import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent, ErrorData } from '../../shared/components/error-dialog.component';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private dialog: MatDialog) {}

  handleError(error: Error): void {
    const err = {
      Name: error.name,
      Message: error.message,
      Cause: error.cause,
      Stack: error.stack,
    };
    console.error(err);
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: 'Error',
        message: `An unexpected error occurred: ${error.message}. Please try again later.`,
      } as ErrorData
    });
  }
}
