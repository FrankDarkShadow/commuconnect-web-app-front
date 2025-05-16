import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layout/admin-layout/admin/admin-layout.component';




import { RegistroComunidadComponent } from './pages/registro-comunidad/registro-comunidad.component';
const routes: Routes = [

 // { path: '', component: AdminComponent },




  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'registro-comunidad', pathMatch: 'full' },
      { path: 'registro-comunidad', component: RegistroComunidadComponent }
      // otras rutas como dashboard, usuarios, etc.
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
