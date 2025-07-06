import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { AutenticacionComponent } from './autenticacion.component';
import { LoginComponent } from './pages/login/login.component';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { SolicitarRecuperacionComponent } from './pages/solicitar-recuperacion/solicitar-recuperacion.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AutenticacionComponent,
    LoginComponent,
    RegisterComponent,
    SolicitarRecuperacionComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AutenticacionModule { }
