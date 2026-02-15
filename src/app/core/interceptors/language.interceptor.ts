import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { AuthService } from '../services/auth.service';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🚀 LanguageInterceptor (Functional) - intercept() called for:', req.url);
  
  const languageService = inject(LanguageService);
  const authService = inject(AuthService);
  
  const currentLanguage = languageService.getCurrentLanguage();
  const token = authService.getToken();

  console.log('🌐 Language Interceptor - Current Language:', currentLanguage);
  console.log('🔗 Request URL:', req.url);

  let headers = req.headers.set('Accept-Language', currentLanguage);

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
    console.log('🔐 Token added to request');
  }

  const clonedRequest = req.clone({ headers });

  // طباعة جميع الهيدرز للتأكد
  console.log('📋 Request Headers:');
  clonedRequest.headers.keys().forEach(key => {
    console.log(`  ${key}: ${clonedRequest.headers.get(key)}`);
  });

  return next(clonedRequest);
};
