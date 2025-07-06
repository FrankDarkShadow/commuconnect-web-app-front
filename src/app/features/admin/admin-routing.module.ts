import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layout/admin-layout/admin/admin-layout.component';
import { RegistroComunidadComponent } from './pages/registro-comunidad/registro-comunidad.component';
import { ListaComunidadComponent } from './pages/lista-comunidad/lista-comunidad.component';
import { EditarComunidadComponent } from './pages/editar-comunidad/editar-comunidad.component';
import { ListaClienteComponent } from './pages/usuario-crud/lista-cliente/lista-cliente.component';
import { ServiciosPorComunidadComponent } from './pages/servicios-por-comunidad/servicios-por-comunidad.component';
import { NuevoServicioPorComunidadComponent } from './pages/nuevo-servicio-por-comunidad/nuevo-servicio-por-comunidad.component';
import { CargarClienteMasivoComponent } from './pages/usuario-crud/cargar-cliente-masivo/cargar-cliente-masivo.component';
import { GestionServiciosComponent } from './pages/gestion-servicios/gestion-servicios.component';
import { CrearServicioComponent } from './pages/crear-servicio/crear-servicio.component';

import { PlanesPorComunidadComponent } from './pages/membresiaxcomunidad/membresiaxcomunidad.component';
import { ComunidadxplanCreateComponent } from './pages/comunidadxplan-create/comunidadxplan-create.component';
import { CrearClienteUnitarioComponent } from './pages/usuario-crud/crear-cliente-unitario/crear-cliente-unitario.component';
import { CrearProfesionalUnitarioComponent } from './pages/crear-profesional-unitario/crear-profesional-unitario.component';
import { CrearLocalUnitarioComponent } from './pages/crear-local-unitario/crear-local-unitario.component';

import { LocalesComponent } from './pages/locales/locales.component';
import { CargarLocalesMasivoComponent } from './pages/cargar-locales-masivo/cargar-locales-masivo.component';
import { CargarSesionesMasivoPresencialComponent } from './pages/cargar-sesiones-masivo/cargar-sesiones-masivo-presencial.component';
import { ProfesionalesServicioComponent } from './pages/profesionales-servicio/profesionales-servicio.component';
import { CargarProfesionalesMasivoComponent } from './pages/profesionales-servicio/cargar-profesionales-masivo/cargar-profesionales-masivo.component';
import { CargarSesionesMasivoComponent } from './pages/profesionales-servicio/cargar-sesiones-masivo/cargar-sesiones-masivo.component';
import { ListaSesionesPorProfesionalesComponent } from './pages/lista-sesiones-por-profesionales/lista-sesiones-por-profesionales.component';
import { DetalleSesionPorProfesionalComponent } from './pages/detalle-sesion-por-profesional/detalle-sesion-por-profesional.component';
import { SolicitudesSuspensionComponent } from './pages/solicitudes-suspension/solicitudes-suspension.component';
import { DetalleSuspensionComponent } from './pages/detalle-suspension/detalle-suspension.component';


import {DetalleClienteComponent} from './pages/usuario-crud/detalle-cliente/detalle-cliente.component';
import {EditarClienteComponent} from './pages/usuario-crud/editar-cliente/editar-cliente.component';
import { PlanesCrudComponent } from './pages/planes-crud/planes-crud.component';
import { ListaSesionesPorLocalComponent } from './pages/lista-sesiones-por-local/lista-sesiones-por-local.component'; 
import { DetalleSesionPorLocalComponent } from './pages/detalle-sesion-por-local/detalle-sesion-por-local.component';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'lista-comunidad', pathMatch: 'full' },
      { path: 'lista-comunidad', component: ListaComunidadComponent },
      { path: 'registro-comunidad', component: RegistroComunidadComponent },
      { path: 'editar-comunidad/:id', component: EditarComunidadComponent },
      { path: 'lista-cliente', component: ListaClienteComponent },
      { path: 'servicios-por-comunidad/:id', component: ServiciosPorComunidadComponent },
      { path: 'nuevo-servicio-por-comunidad/:id', component: NuevoServicioPorComunidadComponent },
      { path: 'cargar-cliente-masivo', component: CargarClienteMasivoComponent },
      { path: 'gestion-servicios', component: GestionServiciosComponent },
      { path: 'crear-servicio', component: CrearServicioComponent },
      { path: 'editar-servicio/:id', component: CrearServicioComponent },
      { path: 'membresiaxcomunidad/:id', component: PlanesPorComunidadComponent },
      { path: 'comunidadxplan-create/:id', component: ComunidadxplanCreateComponent},
      { path: 'crear-cliente-unitario', component: CrearClienteUnitarioComponent},
      { path: 'crear-profesional-unitario', component: CrearProfesionalUnitarioComponent},
      { path: 'crear-local-unitario', component: CrearLocalUnitarioComponent},
      // otras rutas como dashboard, usuarios, etc.

      { path: 'locales/:id', component: LocalesComponent },
      { path: 'cargar-locales-masivo/:id', component: CargarLocalesMasivoComponent },
      { path: 'cargar-sesiones-masivo/:id', component: CargarSesionesMasivoPresencialComponent },
      { path: 'servicio/:id/profesionales', component: ProfesionalesServicioComponent },
      { path: 'cargar-profesionales-masivo', component: CargarProfesionalesMasivoComponent },
      { path: 'cargar-sesiones-masivo', component: CargarSesionesMasivoComponent },
      { path: 'lista-sesiones-por-profesionales/:id', component: ListaSesionesPorProfesionalesComponent},
      {path: 'detalle-sesion-por-profesional/:id', component:DetalleSesionPorProfesionalComponent},

      { path: 'suspensiones', component: SolicitudesSuspensionComponent },
      { path: 'suspensiones/detalle/:id', component: DetalleSuspensionComponent },
      // otras rutas como dashboard, usuarios, etc.
      {path:'detalle-cliente/:id',component:DetalleClienteComponent},
      {path:'editar-cliente/:id',component:EditarClienteComponent},
      {
        path: 'gestion-planes',
        loadChildren: () => import('./pages/planes-crud/planes-crud.module').then(m => m.PlanesCrudModule)
      },
      {path:'lista-sesiones-por-local/:id',component:ListaSesionesPorLocalComponent},
      {path:'detalle-sesion-por-local/:id',component:DetalleSesionPorLocalComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
