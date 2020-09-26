import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnoRoutingModule } from './turno-routing.module';
import { ReservarComponent } from './components/reservar/reservar.component';
import { MaterialModule } from '../material/material.module';
import { PrimeModule } from '../prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [ReservarComponent, CalendarioComponent],
  imports: [
    CommonModule,
    TurnoRoutingModule,
    MaterialModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class TurnoModule { }
