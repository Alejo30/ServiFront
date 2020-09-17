import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarComponent } from "./components/listar/listar.component";
import { ServicioDetailComponent } from './components/servicio-detail/servicio-detail.component';
const routes: Routes = [
  {
  path: '',
  component: ListarComponent
  },
  {
    path: ':id',
    component: ServicioDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
