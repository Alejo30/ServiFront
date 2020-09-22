export * from './empresaController.service';
import { EmpresaControllerService } from './empresaController.service';
export * from './personaController.service';
import { PersonaControllerService } from './personaController.service';
export * from './servicioController.service';
import { ServicioControllerService } from './servicioController.service';
export * from './turnoController.service';
import { TurnoControllerService } from './turnoController.service';
export const APIS = [EmpresaControllerService, PersonaControllerService, ServicioControllerService, TurnoControllerService];
