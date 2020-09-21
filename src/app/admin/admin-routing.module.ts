import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
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
        path: 'create-turno',
        //component: TurnoFormComponent
      },
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'servicios-list',
        component: ServicioListComponent
      },
      {
        path: 'products/create',
        //component: FormProductComponent
      },
      {
        path: 'products/edit/:id',
        //component: ProductEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
