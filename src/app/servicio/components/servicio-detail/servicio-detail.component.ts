import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Servicio, ServicioControllerService, TurnoControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';
import esLocale from '@fullcalendar/core/locales/es';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-servicio-detail',
  templateUrl: './servicio-detail.component.html',
  styleUrls: ['./servicio-detail.component.css']
})
export class ServicioDetailComponent implements OnInit {

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
              private auth: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private af: AngularFireAuth) { }

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

  cargaUsuario(){
    const user =  firebase.auth().currentUser;
    if (user != null) {
      this.perID = user.displayName;
      console.log(this.perID);
    }
    this.value = this.form.value;
    this.value.personaId = this.perID;
   
  }

  saveTurno(event: Event){
    event.preventDefault();
    this.cargaUsuario();
    console.log(this.value);
    if (this.form.valid) {
      alert('El formulario es valido');
      this.turnoSrv.findTurnoDisponibleUsingGET(this.value.fecha, this.value.hora).subscribe(
        data => {
          if(data){
            console.log(data);
            this.turnoSrv.createTurnoUsingPOST(this.value).subscribe(
              data => {
                alert('Se ha registardo su turno');
              }
            );
          }else{
            alert('El turno ya esta ocupado')
          }
          }
      )
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
