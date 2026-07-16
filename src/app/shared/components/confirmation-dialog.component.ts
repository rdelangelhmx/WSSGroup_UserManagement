import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmationData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <div class="dialog-content">{{ data.message }}</div>
    <div class="dialog-actions" style="display:flex; justify-content:flex-end; gap: 8px;">
      <button mat-button mat-dialog-close>{{ data.cancelText || 'Cancel' }}</button>
      <button mat-button color="warn" (click)="dialogRef.close(true)">{{ data.confirmText || 'Confirm' }}</button>
    </div>
  `
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData
  ) {}
}
