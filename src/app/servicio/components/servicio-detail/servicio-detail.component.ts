import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Persona, PersonaControllerService, Servicio, ServicioControllerService, TurnoControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
  selector: 'app-servicio-detail',
  templateUrl: './servicio-detail.component.html',
  styleUrls: ['./servicio-detail.component.css']
})
export class ServicioDetailComponent implements OnInit {


  persona: Persona;
  servicio: Servicio;
  form: FormGroup;
  fecha: string;
  id: string;
  perID: string;
  panelOpenState = false;
  value: any;

  constructor(private route: ActivatedRoute,
              private serviSrv: ServicioControllerService,
              private turnoSrv: TurnoControllerService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              ) { }

  ngOnInit(): void {
   this.route.params.subscribe((params: Params)=> {
    this.id = params.id;
    this.fetchServicio(this.id);
   })
   this.buildForm();
  }

  fetchServicio(id: string){
    this.serviSrv.findIdUsingGET(id).subscribe(
      servicio => {
        this.servicio = servicio;
      }
    )
  }

  cargaUsuario(event: Event){
    event.preventDefault();
    this.authService.userRol().then((user) => {
      this.perID = user.displayName;
      this.value = this.form.value;
      this.value.personaId = this.perID;
      this.saveTurno();
    });
  }

  saveTurno(){
    console.log(this.value);
    if (this.form.valid) {
      alert('El formulario es valido');
      this.turnoSrv.findTurnoDisponibleUsingGET(this.value.fecha, this.value.hora, this.value.servicioId).subscribe(
        data => {
          if (data){
            alert('El turno ya esta ocupado');
          }else{
            this.turnoSrv.createTurnoUsingPOST(this.value).subscribe(
              () => {
                alert('Se ha registardo su turno');
              }
            );
          }
        }
      );
    }else{
      alert('El formulario es invalido');
    }
  }


  private buildForm(){
    this.form = this.formBuilder.group({
      fecha : ['', Validators.required],
      hora: ['', Validators.required],
      servicioId: [this.id],
      personaId: [this.perID]
    });
  }
}
