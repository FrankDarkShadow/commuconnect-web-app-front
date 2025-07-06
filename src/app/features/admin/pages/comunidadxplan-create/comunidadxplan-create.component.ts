import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunidadxplanCreateService, ComunidadXPlanCreate } from '../../services/comunidadxplan-create.service';
import { PlanPorComunidad } from '../../services/membresiaxcomunidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comunidadxplan-create',
  templateUrl: './comunidadxplan-create.component.html',
  styleUrls: ['./comunidadxplan-create.component.css']
})
export class ComunidadxplanCreateComponent implements OnInit {
  idComunidad: number = 0;
  idPlanSeleccionado: number | null = null;
  filtro: string = '';


  constructor(
    private servicio: ComunidadxplanCreateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  planesNoAsociados: PlanPorComunidad[] = [];

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.idComunidad = Number(params['id']) || 0;
    console.log("mi comunidad:"+this.idComunidad);
    this.cargarPlanesNoAsociados();
  });
}

  cargarPlanesNoAsociados(): void {
    this.servicio.obtenerPlanesNoAsociados(this.idComunidad).subscribe({
      next: (res) => {
        this.planesNoAsociados = res;
        console.log("planes no asociados: "+ this.planesNoAsociados);
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los planes.', 'error');
      }
    });
  }
  planesFiltrados(): any[] {
    if (!this.filtro || this.filtro.trim() === '') {
      return this.planesNoAsociados;
    }

    const texto = this.filtro.toLowerCase();
    return this.planesNoAsociados.filter(plan =>
      plan.titulo.toLowerCase().includes(texto)
    );
  }

  agregar(): void {
    if (!this.idPlanSeleccionado) {
      Swal.fire('Atención', 'Debe seleccionar un plan', 'warning');
      return;
    }

    const data: ComunidadXPlanCreate = {
      id_comunidad: this.idComunidad,
      id_plan: this.idPlanSeleccionado
    };

    this.servicio.agregarPlanAComunidad(data).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Plan agregado correctamente', 'success');
        this.router.navigate(['/admin/membresiaxcomunidad',this.idComunidad]);
      },
      error: (err) => {
        if (err.status === 409) {
          Swal.fire('Atención', 'Este plan ya está asociado a la comunidad.', 'info');
        } else {
          Swal.fire('Error', 'No se pudo agregar el plan', 'error');
        }
      }
    });
  }


  cancelar(): void {
    this.router.navigate(['/admin/membresiaxcomunidad',this.idComunidad]);
  }
}