import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from '../../layout/user-layout/admin/admin.component';
import { MisReservacionesComponent } from './mis-reservas/mis-reservaciones/mis-reservaciones.component'; 
import { ReservaDetalleComponent } from './mis-reservas/reserva-detalle/reserva-detalle.component'; 
import { SeleccionComunidadComponent } from './seleccion-comunidad/seleccion-comunidad.component';
import { MisComunidadesComponent } from './mis-comunidades/mis-comunidades.component';
import { PlanComponent } from '../pago/pages/plan/plan.component';
import { ReservasVirtualesComponent } from './pages/reservas-virtuales/reservas-virtuales.component';
import { HomepageComponent } from './homepage/homepage.component'; // Importa el componente HomepageComponent
import { SesionesComponent } from './sesiones/sesiones.component';
import { SeleccionarServicioComponent } from './seleccionar-servicio/seleccionar-servicio.component';
import { MembresiasComponent } from './membresias/membresias.component';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { SuspensionMembresiaComponent } from './membresias/pages/suspension-membresia/suspension-membresia.component';
import { NuevaReservaPresencialComponent } from './pages/nueva-reserva-presencial/nueva-reserva-presencial.component';
import { NuevaReservaVirtualComponent } from './pages/nueva-reserva-virtual/nueva-reserva-virtual.component';

import { CompletarFormularioComponent } from './mis-reservas/completar-formulario/completar-formulario.component'; 
import { GestionCuentaComponent } from './gestion-cuenta/gestion-cuenta.component';
import { HistorialPagosComponent } from './membresias/pages/historial-pagos/historial-pagos.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage/:id', component: HomepageComponent },
      { path: 'sesiones', component: SesionesComponent },
      { path: 'seleccionar-servicio', component: SeleccionarServicioComponent },
      { path: 'reservas-virtuales', component: ReservasVirtualesComponent },
      { path: 'membresias', component: MembresiasComponent },
      { path: 'cambiar-password', component: CambiarPasswordComponent },
      { path: 'suspension-membresia', component: SuspensionMembresiaComponent },
      { path: 'nueva-reserva-presencial', component: NuevaReservaPresencialComponent },
      { path: 'nueva-reserva-virtual', component: NuevaReservaVirtualComponent },
      { path: 'completar-formulario/:id', component: CompletarFormularioComponent },
      { path: 'mis-reservas', component: MisReservacionesComponent }, // Ruta para "Mis Reservas"
      { path: 'reserva-detalle/:id', component: ReservaDetalleComponent }, // Ruta para "Detalle Reserva"
      { path: 'gestion-cuenta', component: GestionCuentaComponent },
      { path: 'historial-pagos', component: HistorialPagosComponent }
    ]
  },
  { path: 'mis-comunidades', component: MisComunidadesComponent },
  { path: 'seleccion-comunidad', component: SeleccionComunidadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
