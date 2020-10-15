import { Component, OnInit } from '@angular/core';
import { Persona, PersonaControllerService, TurnoControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-turno-list',
  templateUrl: './turno-list.component.html',
  styleUrls: ['./turno-list.component.css']
})
export class TurnoListComponent implements OnInit {

  persona: Persona;
  turnos = [];
  displayedColumnsT: string[] = ['fecha', 'hora', 'acciones'];
  timerInterval;
  id: string;
  constructor( private turnSrv: TurnoControllerService,
               private perSrv: PersonaControllerService,
               private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.authService.userRol().then((user) => {
      this.id = user.displayName;
      console.log(user.displayName);
      this.perSrv.findByCedulaUsingGET(this.id).subscribe(
        rest => {
          this.persona = rest;
          console.log(rest);
          this.fetchTurnos(this.id);
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

  openDeleteT(id: string){
    Swal.fire({
      title:  '¿Estás seguro que quieres eliminar este Turno?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Turno eliminado con exito!', '', 'success');
        this.turnSrv.deleteTurnoUsingDELETE(id).subscribe( result => {
          this.fetchTurnos(this.id);
        })
      } else if (result.isDenied) {
      }
    })
   }

}
