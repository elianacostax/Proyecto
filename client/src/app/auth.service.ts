import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(email: string, password: string): Observable<boolean> {
    // Aquí puedes agregar la lógica para autenticar al usuario
    // Por ejemplo, podrías realizar una solicitud HTTP a tu backend
    // y devolver un Observable con un booleano que indique si el inicio de sesión fue exitoso

    // Por simplicidad, aquí simulamos una autenticación exitosa si el correo electrónico y la contraseña son válidos
    if (email === 'usuario@example.com' && password === 'contraseña') {
      // Autenticación exitosa
      return of(true);
    } else {
      // Autenticación fallida
      return of(false);
    }
  }
}
