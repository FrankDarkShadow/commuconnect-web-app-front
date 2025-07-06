import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';


import { RegistroComunidadComponent } from './pages/registro-comunidad/registro-comunidad.component';
import { AdminLayoutModule } from 'src/app/layout/admin-layout/admin-layout.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComunidadComponent } from './pages/lista-comunidad/lista-comunidad.component';
import { EditarComunidadComponent } from './pages/editar-comunidad/editar-comunidad.component';
import { ListaClienteComponent } from './pages/usuario-crud/lista-cliente/lista-cliente.component';
import { ServiciosPorComunidadComponent } from './pages/servicios-por-comunidad/servicios-por-comunidad.component';
import { NuevoServicioPorComunidadComponent } from './pages/nuevo-servicio-por-comunidad/nuevo-servicio-por-comunidad.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CargarClienteMasivoComponent } from './pages/usuario-crud/cargar-cliente-masivo/cargar-cliente-masivo.component';
import { GestionServiciosComponent } from './pages/gestion-servicios/gestion-servicios.component';
import { CrearServicioComponent } from './pages/crear-servicio/crear-servicio.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { PlanesPorComunidadComponent } from './pages/membresiaxcomunidad/membresiaxcomunidad.component';
import { ComunidadxplanCreateComponent } from './pages/comunidadxplan-create/comunidadxplan-create.component';
import { CrearClienteUnitarioComponent } from './pages/usuario-crud/crear-cliente-unitario/crear-cliente-unitario.component';
import { CrearProfesionalUnitarioComponent } from './pages/crear-profesional-unitario/crear-profesional-unitario.component';
import { CrearLocalUnitarioComponent } from './pages/crear-local-unitario/crear-local-unitario.component';


import { ProfesionalesServicioComponent } from './pages/profesionales-servicio/profesionales-servicio.component';
import { CargarProfesionalesMasivoComponent } from './pages/profesionales-servicio/cargar-profesionales-masivo/cargar-profesionales-masivo.component';
import { CargarSesionesMasivoComponent } from './pages/profesionales-servicio/cargar-sesiones-masivo/cargar-sesiones-masivo.component';

import { ListaSesionesPorProfesionalesComponent } from './pages/lista-sesiones-por-profesionales/lista-sesiones-por-profesionales.component';
import { DetalleSesionPorProfesionalComponent } from './pages/detalle-sesion-por-profesional/detalle-sesion-por-profesional.component';

import { LocalesComponent } from './pages/locales/locales.component';
import { CargarLocalesMasivoComponent } from './pages/cargar-locales-masivo/cargar-locales-masivo.component';
import { CargarSesionesMasivoPresencialComponent } from './pages/cargar-sesiones-masivo/cargar-sesiones-masivo-presencial.component';
import { SolicitudesSuspensionComponent } from './pages/solicitudes-suspension/solicitudes-suspension.component';
import { DetalleSuspensionComponent } from './pages/detalle-suspension/detalle-suspension.component';
import { EditarClienteComponent } from './pages/usuario-crud/editar-cliente/editar-cliente.component';
import { DetalleClienteComponent } from './pages/usuario-crud/detalle-cliente/detalle-cliente.component';
import { ListaSesionesPorLocalComponent } from './pages/lista-sesiones-por-local/lista-sesiones-por-local.component';
import { DetalleSesionPorLocalComponent } from './pages/detalle-sesion-por-local/detalle-sesion-por-local.component';




@NgModule({
  declarations: [
    AdminComponent,
    RegistroComunidadComponent,
    ListaComunidadComponent,
    EditarComunidadComponent,
    ListaClienteComponent,
    ServiciosPorComunidadComponent,
    NuevoServicioPorComunidadComponent,
    CargarClienteMasivoComponent,
    GestionServiciosComponent,
    CrearServicioComponent,

    PlanesPorComunidadComponent,
    ComunidadxplanCreateComponent,
    CrearClienteUnitarioComponent,
    CrearProfesionalUnitarioComponent,
    CrearLocalUnitarioComponent,

    ProfesionalesServicioComponent,
    CargarProfesionalesMasivoComponent,
    CargarSesionesMasivoComponent,
    ListaSesionesPorProfesionalesComponent,
    DetalleSesionPorProfesionalComponent,
    LocalesComponent,
    CargarLocalesMasivoComponent,
    CargarSesionesMasivoPresencialComponent,
    SolicitudesSuspensionComponent,
    DetalleSuspensionComponent,
    EditarClienteComponent,
    DetalleClienteComponent,
    ListaSesionesPorLocalComponent,
    DetalleSesionPorLocalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    AdminLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class AdminModule { }
