import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioRoutingModule } from './servicio-routing.module';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ListarComponent } from './components/listar/listar.component';
import { DetalleComponent } from './conponents/detalle/detalle.component';


@NgModule({
  declarations: [RegistrarComponent, ListarComponent, DetalleComponent],
  imports: [
    CommonModule,
    ServicioRoutingModule
  ]
})
export class ServicioModule { }
