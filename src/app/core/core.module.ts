import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaControllerService, PersonaControllerService, ServicioControllerService, TipoUsuarioControllerService, TurnoControllerService } from './Backend';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    EmpresaControllerService,
    PersonaControllerService,
    ServicioControllerService,
    TipoUsuarioControllerService,
    TurnoControllerService
  ]
})
export class CoreModule { }
