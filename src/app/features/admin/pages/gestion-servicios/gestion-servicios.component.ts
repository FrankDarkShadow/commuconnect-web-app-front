import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosGestionService, Servicio } from '../../services/servicios-gestion.service';
import { NotificationData } from 'src/app/shared/components/notification/notification.component';

@Component({
  selector: 'app-gestion-servicios',
  templateUrl: './gestion-servicios.component.html',
  styleUrls: ['./gestion-servicios.component.css']
})
export class GestionServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  terminoBusqueda: string = '';

  // Notification
  showNotification: boolean = false;
  notificationData: NotificationData = {
    type: 'info',
    title: '',
    message: ''
  };

  // Confirmation dialog
  showConfirmDialog: boolean = false;
  servicioAEliminar: Servicio | null = null;

  constructor(
    private serviciosService: ServiciosGestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.serviciosService.obtenerTodosLosServicios(this.terminoBusqueda).subscribe({
      next: (servicios: Servicio[]) => {
        this.servicios = servicios;
      },
      error: (error: any) => {
        console.error('Error al cargar servicios:', error);
        this.showNotificationMessage('error', 'Error al cargar', 'No se pudieron cargar los servicios. Por favor, inténtalo de nuevo.');
      }
    });
  }

  // Se elimina el getter serviciosFiltrados porque el filtrado ahora lo hace el backend
  /* get serviciosFiltrados(): Servicio[] {
    if (!this.terminoBusqueda.trim()) {
      return this.servicios;
    }
    
    return this.servicios.filter(servicio =>
      servicio.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      servicio.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  } */

  // Este método se llamará cada vez que el término de búsqueda cambie
  buscarServicios(): void {
    this.cargarServicios();
  }

  agregarServicio(): void {
    this.router.navigate(['/admin/crear-servicio']);
  }

  editarServicio(idServicio: number): void {
    this.router.navigate(['/admin/editar-servicio', idServicio]);
  }

  eliminarServicio(servicio: any): void {
    this.servicioAEliminar = servicio;
    this.showConfirmDialog = true;
  }

  confirmarEliminacion(): void {
    if (!this.servicioAEliminar) return;

    this.serviciosService.eliminarServicio(this.servicioAEliminar.id_servicio).subscribe({
      next: () => {
        this.showNotificationMessage('success', 'Cambio de estado confirmado', `El servicio "${this.servicioAEliminar!.nombre}" ha sido cambiado de estado exitosamente.`);
        this.servicioAEliminar = null;
        this.showConfirmDialog = false;
        this.cargarServicios();
      },
      error: (error: any) => {
        console.error('Error al eliminar servicio:', error);
        this.showNotificationMessage('error', 'Error al eliminar', 'No se pudo eliminar el servicio. Por favor, inténtalo de nuevo.');
        this.showConfirmDialog = false;
      }
    });
  }

  cancelarEliminacion(): void {
    this.servicioAEliminar = null;
    this.showConfirmDialog = false;
  }

  verLocales(servicio: any): void {
    console.log('Ver locales para servicio:', servicio.nombre);
    // Navegar a la pantalla de locales, pasando el id del servicio
    this.router.navigate(['/admin/locales', servicio.id_servicio]);
  }

  verProfesionales(servicio: Servicio): void {
    this.router.navigate(['/admin/servicio', servicio.id_servicio, 'profesionales']);
  }

  verSesiones(servicio: any): void {
    // Implementa la lógica para navegar a las sesiones de un servicio
    console.log('Ver sesiones para servicio:', servicio.nombre);
    // this.router.navigate(['/admin/sesiones', servicio.id_servicio]);
  }

  private showNotificationMessage(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void {
    this.notificationData = {
      type,
      title,
      message,
      duration: type === 'success' ? 3000 : 0
    };
    this.showNotification = true;
  }

  onNotificationClose(): void {
    this.showNotification = false;
  }

  get confirmationMessage(): string {
    return this.servicioAEliminar 
      ? `¿Estás seguro de cambiar de estado al servicio "${this.servicioAEliminar.nombre}"? `
      : '¿Estás seguro de realizar esta acción?';
  }

  get serviciosFiltrados(): Servicio[] {
  const termino = this.terminoBusqueda.toLowerCase().trim();
  if (!termino) return this.servicios;

  return this.servicios.filter(servicio =>
    servicio.nombre.toLowerCase().includes(termino) ||
    servicio.descripcion.toLowerCase().includes(termino)
  );
}

} 