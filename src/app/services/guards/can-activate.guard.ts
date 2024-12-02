import { inject } from '@angular/core';
import { AuthService } from './../auth.service';
import { CanActivateFn } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  // Retornamos un observable que resuelve a `true` o `false`
  return authService.verifyTokenAPI().pipe(
    map(response => {
      console.log('Token válido:', response.valid);
      return response.valid; // Retorna true si el token es válido
    }),
    catchError(error => {
      console.error('Error verificando token:', error);
      return of(false); // Retorna false si ocurre un error
    })
  );
};