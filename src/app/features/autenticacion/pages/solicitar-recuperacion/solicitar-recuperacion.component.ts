import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solicitar-recuperacion',
  templateUrl: './solicitar-recuperacion.component.html'
})
export class SolicitarRecuperacionComponent {
  email: string = '';
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  enviarLink() {
    this.http.post<any>('http://localhost:8000/api/usuarios/recuperar-contrasena/link', { email: this.email })
      .subscribe({
        next: (res) => {
          this.mensaje = res.mensaje || 'Si existe una cuenta con ese correo, se ha enviado un enlace.';
        },
        error: (err) => {
          console.error('Error en la solicitud:', err);
          this.mensaje = 'Ocurrió un error. Inténtalo nuevamente.';
        }
      });
  }
}
