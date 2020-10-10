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
  servicios = [];
  visible: boolean;
  turnos = [];
  displayedColumnsT: string[] = ['fecha', 'hora', 'acciones'];
  displayedColumnsS: string[] = ['nombre', 'precio'];


  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Perfil', cols: 1, rows: 1 },
          { title: 'Servicios', cols: 1, rows: 1 },
          { title: 'Turnos', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Perfil', cols: 2, rows: 1 },
        { title: 'Servicios', cols: 1, rows: 1},
        { title: 'Turnos', cols: 5, rows: 2 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private perSrv: PersonaControllerService,
              private empSrv: EmpresaControllerService,
              private turnSrv: TurnoControllerService,
              private servSrv: ServicioControllerService,
              private authService: AuthService) {}

    ngOnInit(): void {
      this.getP();
    }


    getP(){
      this.authService.userRol().then((user) => {
        const id = user.displayName;
        console.log(user.displayName);
        this.perSrv.findByCedulaUsingGET(id).subscribe(
          rest => {
            this.persona = rest;
            console.log(rest);
            this.fetchEmpresa(id);
            this.fetchTurnos(id);
            this.usuario = this.persona.nombre;
            console.log(this.usuario)
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
            console.log(this.empresa);
            this.fetchServicios(empId);
          }else{
            this.visible = false;
            console.log(this.empresa);
          }
        }
      );
    }

    fetchServicios(id: string){
      this.servSrv.findServiciosEmpresaUsingGET(id).subscribe(
        servicios => {
          this.servicios = servicios;
      })
    }

    fetchTurnos(id: string){
      this.turnSrv.findTurnosPersonaUsingGET(id).subscribe(
        turnos => {
          this.turnos = turnos;
        }
      )
    }


}
