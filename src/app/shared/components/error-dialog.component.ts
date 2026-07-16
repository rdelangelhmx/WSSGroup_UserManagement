import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ErrorData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-error-dialog',
  template: `
    <div class="content p-3">
      <h2 mat-dialog-title class="text-center text-danger">{{ data.title }}</h2>
      <div class="dialog-content">{{ data.message }}</div>
      <div class="dialog-actions mt-2" style="display:flex; justify-content:flex-end; gap: 8px;">
        <button mat-raised-button color="warn" (click)="dialogRef.close(true)">Ok</button>
      </div>
    </div>
  `
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorData
  ) {}
}
