import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';


import { LayoutModule } from '../../layout/layout.module';
import { SeleccionComunidadComponent } from './seleccion-comunidad/seleccion-comunidad.component';
import { MisComunidadesComponent } from './mis-comunidades/mis-comunidades.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SesionesComponent } from './sesiones/sesiones.component';


@NgModule({
  declarations: [
    UserComponent,
    SeleccionComunidadComponent,
    MisComunidadesComponent,
    HomepageComponent,
    SesionesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,  // 👈 Asegúrate de tener esto aquí
    LayoutModule
  ]
})
export class UserModule { }
