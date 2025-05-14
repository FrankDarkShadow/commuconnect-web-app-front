import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { AutenticacionComponent } from './autenticacion.component';
import { LoginComponent } from './pages/login/login.component';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    AutenticacionComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AutenticacionModule { }
