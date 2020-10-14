import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Persona, PersonaControllerService, Servicio, ServicioControllerService, TurnoControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-servicio-detail',
  templateUrl: './servicio-detail.component.html',
  styleUrls: ['./servicio-detail.component.css']
})
export class ServicioDetailComponent implements OnInit {


  persona: Persona;
  servicio: Servicio;
  dServicio: any = {
    descripcion: '',
    empresaId:'',
    foto: '',
    id: '',
    nombre: '',
    precio: 0
  }
  form: FormGroup;
  user: string;
  fecha: string;
  hora: string;
  id: string;
  perID: string;
  timerInterval
  panelOpenState = false;
  value: any;
  turno : any[] = [
    {
      "hora": '07:00',
      "estado": ''
    },
    {
      "hora": '08:00',
      "estado": ''
    },
    {
      "hora": '09:00',
      "estado": ''
    },
    {
      "hora": '10:00',
      "estado": ''
    },
    {
      "hora": '11:00',
      "estado": ''
    },
    {
      "hora": '12:00',
      "estado": ''
    },
    {
      "hora": '13:00',
      "estado": ''
    },
    {
      "hora": '14:00',
      "estado": ''
    },
    {
      "hora": '15:00',
      "estado": ''
    },
    {
      "hora": '16:00',
      "estado": ''
    },
    {
      "hora": '17:00',
      "estado": ''
    },
    {
      "hora": '18:00',
      "estado": ''
    },
    {
      "hora": '19:00',
      "estado": ''
    }
  ];

  constructor(private route: ActivatedRoute,
              private serviSrv: ServicioControllerService,
              private turnoSrv: TurnoControllerService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private perSrv: PersonaControllerService,
              ) { this.buildForm(); }

  ngOnInit(): void {

   this.route.params.subscribe((params: Params) => {
    this.id = params.id;
    this.fetchServicio(this.id);
   });

   this.getP();
  }

  
  getP(){
    this.authService.hasUser().subscribe(user => {
      if (user) {
        console.log('true');
        const id = user.displayName;
        this.perSrv.findByCedulaUsingGET(id).subscribe(
          rest => {
            this.persona = rest;
            console.log(rest);
            this.user = this.persona.nombre;
            this.perID = this.persona.cedula;
            console.log(this.perID);
          }
        );
      } else {
        console.log('false');

      }
    });
  }

  fetchServicio(id: string){
    this.serviSrv.findIdUsingGET(id).subscribe(
      servicio => {
        this.dServicio = servicio;
      }
    )
  }
  openDialog(){
    Swal.fire({
      title: '¿Estas Seguro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Turno Asignado!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Turno no Asignado', '', 'info');
      }
    })
   }

   openDialogHour(){
    Swal.fire({
      title:  'El turno será asignado a las: ' + this.hora,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Si, acepto`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Turno Asignado! Recuerda llegar a Tiempo', '', 'success');
        this.saveTurno();
      } else if (result.isDenied) {
        Swal.fire('Selecciona otra hora', '', 'info');
      }
    })
   }

  cargaUsuario(){
    this.authService.userRol().then((user) => {
      this.perID = user.displayName;
      console.log(this.perID);
    });
  }

  saveTurno(){
    this.value = this.form.value;
    this.value.hora = this.hora;
    this.value.servicioId = this.id;
    this.value.personaId = this.perID;
    this.turnoSrv.createTurnoUsingPOST(this.value).subscribe(()=>{
      console.log(this.value);
      this.availableTurn();
    });

  }

  getDate(){
    const value = this.form.value;
    this.fecha = value.fecha;
    console.log(this.fecha);
    this.availableTurn();
  }

  
  availableTurn(){
    this.turno.forEach(element => {
      this.turnoSrv.findDisponibleUsingGET(this.fecha, element.hora, this.id).subscribe(data => {
        if (data) {
          element.estado = true;
          this.turno.push[element.estado];
        } else {
          element.estado = false;
        }
      });
    });
  }

  getHour(h: string){
    console.log(h);
    this.hora = h;
    this.openDialogHour();
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