import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { ComunidadService } from '../../services/comunidad.service';

@Component({
  selector: 'app-registro-comunidad',
  templateUrl: './registro-comunidad.component.html',
  styleUrls: ['./registro-comunidad.component.css']
})
export class RegistroComunidadComponent {




comunidad = {
    nombre: '',
    slogan: ''

  };

  imagenURL: string | ArrayBuffer | null = null;
  //archivoLogo: File | null = null;

  archivoLogo: File | undefined = undefined;


  constructor(
    private readonly comunidadService: ComunidadService,
    private readonly router: Router
  ) {}


/*

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      this.archivoLogo = file;

      const reader = new FileReader();
      reader.onload = e => {
        this.imagenURL = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
*/
  onFileSelected(event: any): void {
  const file = event.target.files[0];

  if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e: any) => {
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        // Validar dimensiones
        if (width < 100 || height < 100 || width > 500 || height > 500) {
          alert('El logo debe tener entre 100x100 y 300x300 píxeles');
          return;
        }

        // Validar tamaño del archivo
        if (file.size > 1 * 1024 * 1024) {
          alert('El archivo debe pesar menos de 1 MB');
          return;
        }

        // Si todo está bien, se guarda la imagen
        this.archivoLogo = file;
        this.imagenURL = reader.result;
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    alert('Solo se permiten imágenes JPEG o PNG');
  }
}








  borrarLogo(): void {
    this.archivoLogo = undefined;
    this.imagenURL = null;
  }


 crearComunidad(): void {

    if (!this.comunidad.nombre || this.comunidad.nombre.trim() === '' ) {
      alert('El nombre de la comunidad es obligatorio.');
      return;
    }

   if (this.archivoLogo && this.archivoLogo.size > 1 * 1024 * 1024) {
    alert('El logo no debe superar 1MB');
    return;
   }


    this.comunidadService.crearComunidad(this.comunidad, this.archivoLogo).subscribe({
      next: (res) => {
        console.log('Comunidad creada', res);
        this.router.navigate(['/admin/lista-comunidad']);
      },
      error: (err) => {
        console.error('Error al crear comunidad', err);
      }
    });


  }





}
