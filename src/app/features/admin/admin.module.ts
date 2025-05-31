import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';


import { RegistroComunidadComponent } from './pages/registro-comunidad/registro-comunidad.component';
import { AdminLayoutModule } from 'src/app/layout/admin-layout/admin-layout.module';

import { FormsModule } from '@angular/forms';
import { ListaComunidadComponent } from './pages/lista-comunidad/lista-comunidad.component';
import { EditarComunidadComponent } from './pages/editar-comunidad/editar-comunidad.component';

@NgModule({
  declarations: [
    AdminComponent,
    RegistroComunidadComponent,
    ListaComunidadComponent,
    EditarComunidadComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLayoutModule,
    FormsModule


  ]
})
export class AdminModule { }
