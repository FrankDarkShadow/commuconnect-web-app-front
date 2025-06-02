import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-correo-confirmado',
  templateUrl: './correo-confirmado.component.html',
  styleUrls: ['./correo-confirmado.component.css']
})


export class CorreoConfirmadoComponent implements OnInit {

  mensaje: string = 'Confirmando...';
  confirmado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');

    if (token) {
     this.http.get(`${environment.apiUrl}/usuarios/confirm/${token}`)

        .subscribe({
          next: (res: any) => {
            this.mensaje = '¡Correo confirmado exitosamente!';
            this.confirmado = true;
          },
          error: (err) => {
            this.mensaje = 'El enlace no es válido o ya ha expirado.';
            this.confirmado = false;
          }
        });
    } else {
      this.mensaje = 'Token no encontrado.';
    }
  }
}




