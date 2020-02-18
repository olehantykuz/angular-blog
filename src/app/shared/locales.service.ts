import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {
  locales = [
    'en',
    'ua'
  ];
  locale = 'en';

  constructor() { }

  setLocale(id: string) {
    if (this.locales.includes(id)) {
      this.locale = id;
    }
  }
}
