import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComunidadService } from '../../services/comunidad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-comunidad',
  templateUrl: './editar-comunidad.component.html',
  styleUrls: ['./editar-comunidad.component.css']
})
export class EditarComunidadComponent {


idComunidad: number | null = null;



comunidad = {
    nombre: '',
    slogan: ''

  };



  imagenURL: string | ArrayBuffer | null = null;
  //archivoLogo: File | null = null;

  archivoLogo: File | undefined = undefined;

constructor(
  private readonly comunidadService: ComunidadService,
  private readonly router: Router,
  private readonly route: ActivatedRoute
) {}

/*
ngOnInit(): void {
  this.idComunidad = Number(this.route.snapshot.paramMap.get('id'));

  if (this.idComunidad) {
    this.comunidadService.obtenerPorId(this.idComunidad).subscribe({
      next: (data) => {
        this.comunidad = {
          nombre: data.nombre,
          slogan: data.slogan
          // Agrega otros campos si los tienes
        };

        if (data.logoBase64) {
          this.imagenURL = data.logoBase64;
        }
      },
      error: (err) => {
        console.error('Error al obtener comunidad', err);
      }
    });
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


editarComunidad(): void {



  if (!this.comunidad.nombre) {
    alert('Por favor, completa los campos requeridos');
    return;
  }

  if (!this.idComunidad) {
    alert('ID de comunidad no encontrado');
    return;
  }
/*
  this.comunidadService.editarComunidad(this.idComunidad, this.comunidad, this.archivoLogo).subscribe({
    next: (res) => {
      console.log('Comunidad actualizada', res);
      this.router.navigate(['/comunidades']);
    },
    error: (err) => {
      console.error('Error al actualizar comunidad', err);
    }
  });


*/


}




}
