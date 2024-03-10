// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../auth.service'; // Importa el servicio de autenticación
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private http: HttpClient) { } // Inyecta el servicio de autenticación

  login(): void {
    // Realiza la solicitud HTTP al backend para autenticar al usuario
    this.http.post<any>('URL_DEL_BACKEND/login', { email: this.email, password: this.password })
      .subscribe(
        response => {
          // Maneja la respuesta del backend
          console.log('Respuesta del backend:', response);
          // Aquí podrías redirigir al usuario a otra página de tu aplicación si el inicio de sesión fue exitoso
        },
        error => {
          // Maneja los errores de la solicitud HTTP
          console.error('Error al iniciar sesión:', error);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      );
  }
}
