import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentacionComponent } from './presentacion.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { MembresiasComponent } from './pages/membresias/membresias.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';

import { ServiciosComponent } from './pages/servicios/servicios.component'; // ✅ Asegúrate de importar esto

import { LoginComponent } from '../../features/autenticacion/pages/login/login.component'

import {ComunidadesComponent} from './pages/comunidades/comunidades.component';
import { ConfirmarCorreoComponent } from './pages/confirmar-correo/confirmar-correo.component';
import { CorreoConfirmadoComponent } from './pages/correo-confirmado/correo-confirmado.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // ✅ Redirección base
  { path: 'inicio', component: InicioComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'membresias', component: MembresiasComponent },
  { path: 'nosotros',component: NosotrosComponent},
  { path: 'comunidades',component: ComunidadesComponent},
  { path: 'confirmar-correo', component: ConfirmarCorreoComponent },
  { path: 'correo-confirmado/:token', component: CorreoConfirmadoComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentacionRoutingModule { }
