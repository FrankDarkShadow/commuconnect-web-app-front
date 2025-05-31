import { Component, OnInit } from '@angular/core';
import { ComunidadService } from '../../services/comunidad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-comunidad',
  templateUrl: './lista-comunidad.component.html',
  styleUrls: ['./lista-comunidad.component.css']
})
export class ListaComunidadComponent  implements OnInit{

 comunidades: any[] = [];


 constructor(
     private readonly comunidadService: ComunidadService,
     private readonly router: Router
   ) {}

/*
ngOnInit(): void {
    this.comunidadService.listarComunidades().subscribe({
      next: (data) => this.comunidades = data,
      error: (err) => console.error('Error cargando comunidades', err),
    });




  }
*/
ngOnInit(): void {
  this.comunidadService.listarComunidades().subscribe({
    next: (data) => {
      this.comunidades = data.map(c => {
        if (c.imagen) {
          // Agrega el prefijo para que Angular entienda que es una imagen base64
          c.imagen = `data:image/jpeg;base64,${c.imagen}`;
          // Cambia "jpeg" si sabes que el formato es otro, ej: png
        }
        return c;
      });
    },
    error: (err) => console.error('Error cargando comunidades', err),
  });
}


eliminarComunidad(id: number): void {
  if (confirm('¿Estás seguro de eliminar esta comunidad?')) {
    this.comunidadService.eliminarComunidad(id).subscribe({
      next: () => {
        // Quitamos la comunidad eliminada de la lista local
        this.comunidades = this.comunidades.filter(c => c.id_comunidad !== id);
      },
      error: (err) => {
        console.error('Error al eliminar comunidad', err);
        alert('No se pudo eliminar la comunidad.');
      }
    });
  }
}











}
