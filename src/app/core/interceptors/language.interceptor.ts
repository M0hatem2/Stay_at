import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { AuthService } from '../services/auth.service';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {

  const languageService = inject(LanguageService);
  const authService = inject(AuthService);

  const currentLanguage = languageService.getCurrentLanguage();
  const token = authService.getToken();

 

  let headers = req.headers.set('Accept-Language', currentLanguage);

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const clonedRequest = req.clone({ headers });


  return next(clonedRequest);
};
