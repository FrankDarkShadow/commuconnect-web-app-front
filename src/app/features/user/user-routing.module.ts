import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

//Para las comunidades
import { SeleccionComunidadComponent } from './seleccion-comunidad/seleccion-comunidad.component';
//Para ver mis comunidaes
import { MisComunidadesComponent } from './mis-comunidades/mis-comunidades.component';
//const routes: Routes = [{ path: '', component: UserComponent }];
import { HomepageComponent } from './homepage/homepage.component'; // importa el componente

import { ReservasDisponiblesComponent } from './pages/reservas-disponibles/reservas-disponibles.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'homepage', component: HomepageComponent },

      { path: 'seleccion-comunidad', component: SeleccionComunidadComponent },
      // otras rutas hijas futuras pueden ir aquí
      { path: 'mis-comunidades', component: MisComunidadesComponent }, // ✅ Nueva ruta
      { path: '', redirectTo: 'mis-comunidades', pathMatch: 'full' },
      { path: 'reservas', component: ReservasDisponiblesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {




 }
