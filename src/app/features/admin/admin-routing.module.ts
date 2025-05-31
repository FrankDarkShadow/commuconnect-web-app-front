import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layout/admin-layout/admin/admin-layout.component';




import { RegistroComunidadComponent } from './pages/registro-comunidad/registro-comunidad.component';
import { ListaComunidadComponent } from './pages/lista-comunidad/lista-comunidad.component';
import { EditarComunidadComponent } from './pages/editar-comunidad/editar-comunidad.component';



const routes: Routes = [

 // { path: '', component: AdminComponent },




  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'lista-comunidad', pathMatch: 'full' },
      { path: 'lista-comunidad', component: ListaComunidadComponent },
      { path: 'registro-comunidad', component: RegistroComunidadComponent },
      { path: 'editar-comunidad', component: EditarComunidadComponent },


      // otras rutas como dashboard, usuarios, etc.
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
