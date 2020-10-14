import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Empresa, EmpresaControllerService, Persona, PersonaControllerService, ServicioControllerService, TurnoControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */

  persona: Persona;
  usuario: string;
  empresa: Empresa;
  visible: boolean;
  
  constructor(private perSrv: PersonaControllerService,
              private empSrv: EmpresaControllerService,
              private authService: AuthService) {}

    ngOnInit(): void {
      this.getUser();
    }


    getUser(){
      this.authService.userRol().then((user) => {
        const id = user.displayName;
        this.perSrv.findByCedulaUsingGET(id).subscribe(
          rest => {
            this.persona = rest;
            this.fetchEmpresa(id);
            this.usuario = this.persona.nombre;
          }
        );
      });
    }

    fetchEmpresa(id: string){
      this.empSrv.findByIdPersonaUsingGET(id).subscribe(
        rest => {
          this.empresa = rest;
          if (rest) {
            this.visible = true;
            const empId = this.empresa.ruc;
          }else{
            this.visible = false;
          }
        }
      );
    }

}
