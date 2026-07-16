import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateFormatService {
  format(date: Date): string {
    return date.toLocaleDateString('es-MX'); // UK format
  }
}
