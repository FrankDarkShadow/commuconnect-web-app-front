import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  tokenValido: boolean = false;
  password: string = '';
  confirmPassword: string = '';
  mensaje: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.http.post<any>('http://localhost:8000/api/usuarios/verificar-token', { token: this.token }).subscribe({
          next: (res) => {
            this.tokenValido = res.valido;
          },
          error: (err) => {
            console.error('Error verificando token:', err);
            this.tokenValido = false;
          }
        });
      }
    });
  }

cambiarPassword() {
  if (this.password.length >= 8 && this.password === this.confirmPassword) {
    this.http.post<any>('http://localhost:8000/api/usuarios/reset-password/link', {
      token: this.token,
      nueva_contrasena: this.password
    }).subscribe({
      next: (res) => {
        this.mensaje = 'Tu contraseña fue actualizada exitosamente. Serás redirigido al inicio de sesión...';
        setTimeout(() => this.router.navigate(['/autenticacion/login']), 3000);
      },
      error: (err) => {
        console.error('Error al cambiar la contraseña:', err);
        this.mensaje = 'Ocurrió un error al cambiar la contraseña.';
      }
    });
  } else {
    this.mensaje = 'Las contraseñas no coinciden o no cumplen con los requisitos.';
  }
}

}
