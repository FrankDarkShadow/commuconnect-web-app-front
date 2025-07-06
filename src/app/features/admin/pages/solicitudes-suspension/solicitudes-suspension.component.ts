import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuspensionAdminService, SuspensionRequest } from '../../services/suspension-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes-suspension',
  templateUrl: './solicitudes-suspension.component.html',
  styleUrls: ['./solicitudes-suspension.component.css']
})
export class SolicitudesSuspensionComponent implements OnInit {
  suspensiones: SuspensionRequest[] = [];
  loading = false;
  error = '';

  constructor(
    private suspensionService: SuspensionAdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarSuspensiones();
  }

  cargarSuspensiones(): void {
    this.loading = true;
    this.error = '';
    
    this.suspensionService.obtenerTodasSuspensiones().subscribe({
      next: (suspensiones) => {
        this.suspensiones = suspensiones;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las suspensiones';
        this.loading = false;
        console.error(error);
      }
    });
  }

  verDetalle(idSuspension: number): void {
    this.router.navigate(['/admin/suspensiones/detalle', idSuspension]);
  }

  aprobar(suspension: SuspensionRequest): void {
    if (!suspension.puede_modificar) {
      Swal.fire({
        icon: 'warning',
        title: 'Acción no disponible',
        text: 'Esta suspensión ya no se puede modificar.'
      });
      return;
    }

    Swal.fire({
      title: '¿Aprobar suspensión?',
      text: `¿Está seguro de que desea aprobar la suspensión de ${suspension.nombres} ${suspension.apellidos}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, aprobar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#28a745'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.suspensionService.aprobarSuspension(suspension.id_suspension).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Suspensión aprobada',
              text: response.message
            });
            this.cargarSuspensiones();
          },
          error: (error) => {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al aprobar la suspensión'
            });
            console.error(error);
          }
        });
      }
    });
  }

  rechazar(suspension: SuspensionRequest): void {
    if (!suspension.puede_modificar) {
      Swal.fire({
        icon: 'warning',
        title: 'Acción no disponible',
        text: 'Esta suspensión ya no se puede modificar.'
      });
      return;
    }

    Swal.fire({
      title: '¿Rechazar suspensión?',
      text: `¿Está seguro de que desea rechazar la suspensión de ${suspension.nombres} ${suspension.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.suspensionService.rechazarSuspension(suspension.id_suspension).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Suspensión rechazada',
              text: response.message
            });
            this.cargarSuspensiones();
          },
          error: (error) => {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al rechazar la suspensión'
            });
            console.error(error);
          }
        });
      }
    });
  }

  getColorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      'info': 'badge-info',
      'success': 'badge-success',
      'warning': 'badge-warning',
      'danger': 'badge-danger',
      'secondary': 'badge-secondary'
    };
    return colorMap[color] || 'badge-secondary';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES');
  }
} 