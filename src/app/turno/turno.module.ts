import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnoRoutingModule } from './turno-routing.module';
import { ReservarComponent } from './components/reservar/reservar.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [ReservarComponent],
  imports: [
    CommonModule,
    TurnoRoutingModule,
    MaterialModule
  ]
})
export class TurnoModule { }
