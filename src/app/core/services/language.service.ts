import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_KEY = 'Accept-Language';
  private readonly DEFAULT_LANGUAGE = 'ar';
  
  private currentLanguageSubject: BehaviorSubject<string>;
  public currentLanguage$: Observable<string>;

  constructor() {
    const savedLanguage = this.getStoredLanguage();
    this.currentLanguageSubject = new BehaviorSubject<string>(savedLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();
    
    this.applyLanguageDirection(savedLanguage);
  }

  getCurrentLanguage(): string {
    const currentLang = this.currentLanguageSubject.value;
     return currentLang;
  }

  setLanguage(language: string): void {
     localStorage.setItem(this.LANGUAGE_KEY, language);
    this.currentLanguageSubject.next(language);
    this.applyLanguageDirection(language);
  }

  private getStoredLanguage(): string {
    return localStorage.getItem(this.LANGUAGE_KEY) || this.DEFAULT_LANGUAGE;
  }

  private applyLanguageDirection(language: string): void {
    const htmlElement = document.documentElement;
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    htmlElement.setAttribute('dir', direction);
    htmlElement.setAttribute('lang', language);
  }
}
