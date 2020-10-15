import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Turno, TurnoControllerService } from 'src/app/core/Backend';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-turno-edit',
  templateUrl: './turno-edit.component.html',
  styleUrls: ['./turno-edit.component.css']
})
export class TurnoEditComponent implements OnInit {

  form: FormGroup; 
  id: string;
  turno: Turno;
  timerInterval;


  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private activeRoute: ActivatedRoute,
               private turnoSrv: TurnoControllerService
               ) {
                 }

  ngOnInit(): void {
    this.buildForm();
    this.getTurno();
  }

  openUpdateT(){
    Swal.fire({
      title:  '¿Quieres guardar los cambios?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Datos guardados con exito!', '', 'success');
        this.updateTurno();
      } else if (result.isDenied) {
        Swal.fire('Ok', '', 'info');
        this.getTurno();
      }
    });
   }

   getTurno(){
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.turnoSrv.findIdUsingGET1(this.id).subscribe( turno => {
          this.form.patchValue(turno);
          console.log(turno);
          this.turno = turno;
        }
        );
      });
   }

  updateTurno(){
    const newTurno = this.form.value;
    newTurno.personaId = this.turno.personaId;
    newTurno.servicioId = this.turno.servicioId;
    this.turnoSrv.updateTurnoUsingPUT(newTurno).subscribe(() => {
      this.router.navigate(['/admin/turnos']);
    });
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      id: [this.id],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      personaId: ['', [Validators.required]],
      servicioId: ['', [Validators.required]],
    })
  }

}
