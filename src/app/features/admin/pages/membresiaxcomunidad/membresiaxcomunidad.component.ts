import { Component, OnInit } from '@angular/core';
import { MembresiaxcomunidadService, PlanPorComunidad } from '../../services/membresiaxcomunidad.service';
import Swal from 'sweetalert2';
import { ComunidadxplanCreateComponent } from '../comunidadxplan-create/comunidadxplan-create.component';
import { Router ,ActivatedRoute} from '@angular/router';
import { ComunidadService } from '../../services/comunidad.service';

@Component({
  selector: 'app-membresiaxcomunidad',
  templateUrl: './membresiaxcomunidad.component.html',
  styleUrls: ['./membresiaxcomunidad.component.css']
})
export class PlanesPorComunidadComponent implements OnInit {
  planes: PlanPorComunidad[] = [];
  planesFiltrados: PlanPorComunidad[] = [];
  buscarTexto: string = '';
  idComunidad: number = 0;
  paginaActual = 1;
  entradasPorPagina = 4;
  comunidad : any;
  constructor(
    private planesService: MembresiaxcomunidadService,
    private comunidadesService:ComunidadService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

 

 ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.idComunidad = Number(params['id']) || 0;
    console.log( this.idComunidad);
    this.cargarPlanes();

    this.cargarDetalleDeComunidad();

  });
}

  cargarDetalleDeComunidad():void{

this.comunidadesService.obtenerPorId(this.idComunidad).subscribe({
      next: (res) => {
        
        this.comunidad = res;

        console.log(this.comunidad.nombre);
      
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los planes.', 'error');
      }
    });

  }


  cargarPlanes(): void {
    this.planesService.obtenerPlanesPorComunidad(this.idComunidad).subscribe({
      next: (res) => {
        console.log('Planes cargados:', res);
        this.planes = res;
        this.aplicarFiltro();
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los planes.', 'error');
      }
    });
  }

  aplicarFiltro(): void {
    const texto = this.buscarTexto.toLowerCase();
    this.planesFiltrados = this.planes.filter(plan =>
      plan.titulo?.toLowerCase().includes(texto)
    );
    this.paginaActual = 1;
  }

  abrirAgregarPlan(id: number): void {
     this.router.navigate(['/admin/comunidadxplan-create', id]);
  }


  eliminarPlan(idPlan: number): void {
    Swal.fire({
      title: '¿Eliminar plan?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.planesService.eliminarPlan(idPlan).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El plan ha sido eliminado.', 'success');
            this.cargarPlanes();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el plan.', 'error');
          }
        });
      }
    });
  }

  verDetalle(plan: PlanPorComunidad): void {
    Swal.fire('Detalle del Plan', `Nombre: ${plan.titulo}\nDuración: ${plan.duracion} meses\nTopes: ${plan.topes ?? '-'}\nPrecio: S/. ${plan.precio.toFixed(2)}`, 'info');
  }

  getPlanesPaginados(): PlanPorComunidad[] {
    const inicio = (this.paginaActual - 1) * this.entradasPorPagina;
    return this.planesFiltrados.slice(inicio, inicio + this.entradasPorPagina);
  }

  totalPaginas(): number {
    return Math.ceil(this.planesFiltrados.length / this.entradasPorPagina);
  }

  cambiarPagina(nueva: number): void {
    this.paginaActual = nueva;
  }

  volverAComunidades() {

    this.router.navigate(
      ['/admin/lista-comunidad']
    );

  }
}