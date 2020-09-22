import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaControllerService, PersonaControllerService, ServicioControllerService, TurnoControllerService } from './Backend';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    EmpresaControllerService,
    PersonaControllerService,
    ServicioControllerService,
    TurnoControllerService
  ]
})
export class CoreModule { }
