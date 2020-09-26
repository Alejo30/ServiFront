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
  mostrar: boolean;
  form: FormGroup;
  fecha: string;
  id: string
  perID: string;

  calendarOptions: CalendarOptions = {
    locale: esLocale,
    editable: true,
    selectable: true,
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-09-01' },
      { title: 'event 2', date: '2020-09-10' }
    ]
    
  };


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
    console.log(id);
    this.serviSrv.findIdUsingGET(id).subscribe(
      servicio => {
        this.servicio = servicio
      }
    )
  }

  reservar(){
    this.mostrar = true;

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
      this.turnoSrv.createTurnoUsingPOST(value).subscribe(
        data => {
          alert('Se ha registardo su turno')
        }
      )
    }else{
      alert('El formulario es invalido')
    }
  }

  handleDateClick(arg) {
    this.fecha = arg.dateStr
    alert('date click! ' + arg.dateStr)
    this.form.setValue({
      fecha : this.fecha,
      hora: '',
      servicioId: this.id,
      personaId: this.perID,
    })
    const value = this.form.value;
   console.log(this.fecha)
   console.log(value)

  }

  private buildForm(){
    this.form = this.formBuilder.group({
      fecha : [this.fecha, Validators.required],
      hora: ['', Validators.required],
      servicioId: [this.id, Validators.required],
      personaId: [this.perID, Validators.required],
    })
    
  }


}
