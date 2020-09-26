import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ReservarComponent } from './components/reservar/reservar.component';

const routes: Routes = [{
  path: '',
  component: ReservarComponent
},
 {
   path: 'calendario',
   component: CalendarioComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnoRoutingModule { }
