import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnoRoutingModule } from './turno-routing.module';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ListarComponent } from './components/listar/listar.component';
import { ReservarComponent } from './components/reservar/reservar.component';


@NgModule({
  declarations: [RegistrarComponent, ListarComponent, ReservarComponent],
  imports: [
    CommonModule,
    TurnoRoutingModule
  ]
})
export class TurnoModule { }
