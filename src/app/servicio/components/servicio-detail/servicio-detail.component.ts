import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
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
  id: string
  perID: string;
  panelOpenState = false;

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
   const user =  firebase.auth().currentUser;
   if (user != null) {
     this.perID = user.displayName
     console.log(this.perID)
   }
   const value = this.form.value
   value.personaId = this.perID
  }

  fetchServicio(id: string){
    console.log(id);
    this.serviSrv.findIdUsingGET(id).subscribe(
      servicio => {
        this.servicio = servicio
      }
    )
  }

  reservar(){
    const user =  firebase.auth().currentUser;
    if (user != null) {
      this.perID = user.displayName
      console.log(this.perID)
    }
    const value = this.form.value
    value.personaId = this.perID
    console.log(value)

  }

  saveTurno(event: Event){
    
    event.preventDefault();
   
    if (this.form.valid) {
      const value = this.form.value;
     /*  this.turnoSrv.createTurnoUsingPOST(value).subscribe(
        data => {
          alert('Se ha registardo su turno')
        }
      ) */
    }else{
      alert('El formulario es invalido')
    }
  }


  private buildForm(){
    this.form = this.formBuilder.group({
      fecha : ['', Validators.required],
      hora: ['', Validators.required],
      servicioId: [this.id, Validators.required],
      personaId: [this.perID, Validators.required],
    })
    
  }


}
