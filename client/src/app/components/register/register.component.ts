// register.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa el módulo HttpClient

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  lastname: string = '';
  faculty: string = '';
  phone: number = 0;
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  register(): void {
    // Realiza la solicitud HTTP al backend para registrar un nuevo usuario
    this.http.post<any>('URL_DEL_BACKEND/register', { name: this.name, lastname: this.lastname, faculty: this.faculty, phone: this.phone, email: this.email, password: this.password })
      .subscribe(
        response => {
          // Maneja la respuesta del backend
          console.log('Usuario registrado exitosamente:', response);
          // Aquí podrías redirigir al usuario a otra página de tu aplicación si el registro fue exitoso
        },
        error => {
          // Maneja los errores de la solicitud HTTP
          console.error('Error al registrar usuario:', error);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      );
  }
}

