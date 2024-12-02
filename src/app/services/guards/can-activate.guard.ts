import { inject } from '@angular/core';
import { AuthService } from './../auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)

  // Retornamos un observable que resuelve a `true` o `false`
  return authService.verifyTokenAPI().pipe(
    map(response => {
      console.log('Token válido:', response.valid);
      if(!response.valid){
        router.navigate(['/login']) 
      } 
      return response.valid
    }),
    catchError(error => {
      console.error('Error verificando token:', error);
      router.navigate(['/login']) 
      return of(false); // Retorna false si ocurre un error
    })
  );
};