import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Empresa, EmpresaControllerService, Persona, PersonaControllerService, TurnoControllerService } from 'src/app/core/Backend';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */

  persona: any;
  empresa: Empresa[];
  id: string;
  visible: boolean;
  turnos = [];
  displayedColumns: string[] =['fecha', 'hora', 'acciones'];


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
        { title: 'Turnos', cols: 1, rows: 2 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private perSrv: PersonaControllerService,
              private empSrv: EmpresaControllerService,
              private turnSrv: TurnoControllerService,
              private authService: AuthService) {}

    ngOnInit(): void {
      this.getP();
    }


    getP(){
      this.authService.userRol().then((user)=> {
        this.id = user.displayName;
        console.log(user.displayName);
        this.perSrv.findByCedulaUsingGET(this.id).subscribe(
          rest => {
            this.persona = rest;
            console.log(rest);
            this.fetchServicios();
            this.fetchTurnos();
          }
        );
      });
    }

    fetchServicios(){
      this.empSrv.findByIdPersonaUsingGET(this.id).subscribe(
        rest => {
          if (rest) {
            alert('no Tiene empresa');
            this.visible = false;
          }else{
            alert('Tiene')
            this.visible= true;
            this.empresa = rest;
          }
          console.log(rest);
        }
      )
    }

    fetchTurnos(){
      this.turnSrv.findTurnosPersonaUsingGET(this.id).subscribe(
        turnos => {
          this.turnos = turnos;
        }
      )
    }


}
