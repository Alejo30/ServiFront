import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { EmpresaControllerService } from './api/empresaController.service';
import { PersonaControllerService } from './api/personaController.service';
import { ServicioControllerService } from './api/servicioController.service';
import { TipoUsuarioControllerService } from './api/tipoUsuarioController.service';
import { TurnoControllerService } from './api/turnoController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    EmpresaControllerService,
    PersonaControllerService,
    ServicioControllerService,
    TipoUsuarioControllerService,
    TurnoControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<unknown> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
