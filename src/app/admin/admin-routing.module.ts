import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ServicioEditComponent } from './components/servicio-edit/servicio-edit.component';
import { ServicioFormComponent } from './components/servicio-form/servicio-form.component';
import { ServicioListComponent } from './components/servicio-list/servicio-list.component';


const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'create-servicio',
        component: ServicioFormComponent
      },
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'servicios',
        component: ServicioListComponent
      },
      {
        path: 'servicios/edit/:id',
        component: ServicioEditComponent
      },
      {
        path: 'profile',
        component: PerfilComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
