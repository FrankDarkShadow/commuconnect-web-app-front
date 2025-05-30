import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { PresentacionRoutingModule } from './presentacion-routing.module';
import { PresentacionComponent } from './presentacion.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { MembresiasComponent } from './pages/membresias/membresias.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ComunidadesComponent } from './pages/comunidades/comunidades.component';
import { ConfirmarCorreoComponent } from './pages/confirmar-correo/confirmar-correo.component';
import { CorreoConfirmadoComponent } from './pages/correo-confirmado/correo-confirmado.component';


@NgModule({
  declarations: [
    PresentacionComponent,
    InicioComponent,
    ServiciosComponent,
    MembresiasComponent,
    NosotrosComponent,
    ComunidadesComponent,
    ConfirmarCorreoComponent,
    CorreoConfirmadoComponent
  ],
  imports: [
    CommonModule,
    PresentacionRoutingModule,
    SharedModule

  ]
})
export class PresentacionModule { }
