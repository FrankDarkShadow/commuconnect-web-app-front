import { AdminLayoutComponent } from './admin/admin-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComunidadComponent } from 'src/app/features/admin/pages/registro-comunidad/registro-comunidad.component';


const routes: Routes = [


 {
    path: '',
    component: AdminLayoutComponent,
    children: [
      //{ path: 'dashboard', component: DashboardComponent },
      { path: 'registro-comunidad', component: RegistroComunidadComponent },
     // { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
