import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'user', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },
  { path: 'autenticacion', loadChildren: () => import('./features/autenticacion/autenticacion.module').then(m => m.AutenticacionModule) },
  { path: 'pago', loadChildren: () => import('./features/pago/pago.module').then(m => m.PagoModule) },
  { path: 'presentacion', loadChildren: () => import('./features/presentacion/presentacion.module').then(m => m.PresentacionModule) },

 // { path: '', redirectTo: '/presentacion', pathMatch: 'full' },

 { path: '', redirectTo: '/admin', pathMatch: 'full' },
 { path: '**', redirectTo: 'admin' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
