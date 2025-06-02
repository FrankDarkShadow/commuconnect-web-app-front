



import { Component,OnInit } from '@angular/core';

import { ActivatedRoute ,Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirmar-correo',
  templateUrl: './confirmar-correo.component.html',
  styleUrls: ['./confirmar-correo.component.css']
})
export class ConfirmarCorreoComponent {
  confirmado = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
/*
  ngOnInit(): void {

    const token = this.route.snapshot.paramMap.get('token');


    if (token) {

      const url = `${environment.apiUrl}/usuarios/confirm/${token}`;

      this.http.get(url).subscribe({
        next: (res) => {
          this.confirmado = true;

          // Redirigir después de unos segundos (opcional)
          setTimeout(() => {
            this.router.navigate(['/correo-confirmado']);  // o cualquier ruta de tu app
          }, 3000); // 3 segundos de espera para que vea el mensaje
        },
        error: (err) => {
          this.error = err.error?.detail || 'Ocurrió un error al confirmar el correo.';
        }
      });
    } else {
      this.error = 'Token no proporcionado.';
    }
  }
    */
}
