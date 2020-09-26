import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioRoutingModule } from './servicio-routing.module';
import { ListarComponent } from './components/listar/listar.component';
import { ServicioDetailComponent } from "./components/servicio-detail/servicio-detail.component";
import { MaterialModule } from '../material/material.module';
import { ServicioComponent } from './components/servicio/servicio.component';
import { PrimeModule } from '../prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ListarComponent, ServicioDetailComponent, ServicioComponent],
  imports: [
    CommonModule,
    ServicioRoutingModule,
    MaterialModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ServicioModule { }
