import { Component, OnInit } from '@angular/core';
import { Persona, PersonaControllerService, TurnoControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-turno-list',
  templateUrl: './turno-list.component.html',
  styleUrls: ['./turno-list.component.css']
})
export class TurnoListComponent implements OnInit {

  persona: Persona;
  turnos = [];
  displayedColumnsT: string[] = ['fecha', 'hora', 'acciones'];
  constructor( private turnSrv: TurnoControllerService,
               private perSrv: PersonaControllerService,
               private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.authService.userRol().then((user) => {
      const id = user.displayName;
      console.log(user.displayName);
      this.perSrv.findByCedulaUsingGET(id).subscribe(
        rest => {
          this.persona = rest;
          console.log(rest);
          this.fetchTurnos(id);
        }
      );
    });
  }

  fetchTurnos(id: string){
    this.turnSrv.findTurnosPersonaUsingGET(id).subscribe(
      turnos => {
        this.turnos = turnos;
      }
    );
  }

}
