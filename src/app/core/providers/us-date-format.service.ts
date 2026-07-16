import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsDateFormatService {
  format(date: Date): string {
    return date.toLocaleDateString('en-US'); // US format
  }
}
