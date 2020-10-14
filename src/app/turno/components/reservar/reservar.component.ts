import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TurnoControllerService } from 'src/app/core/Backend';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  form: FormGroup;
  fecha: string;
  hora: string;
  disponible: boolean;
  prueba$: Observable<any>;
  fechaA  = new Date('2020-10-13');
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
    }
  ];


  constructor(private formBuilder: FormBuilder, private turnoSrv: TurnoControllerService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  prueba(){
    const value = this.form.value;
    this.fecha = value.fecha;
    console.log(this.fecha);
    this.pruebaB();
  }


  private buildForm(){
    this.form = this.formBuilder.group({
      fecha : ['', Validators.required],
      hora: ['', Validators.required],
      servicioId: ['', Validators.required],
      personaId: ['', Validators.required],
    })
    
  }

  pruebaB(){
    this.turno.forEach(element => {
      console.log(this.fecha)
      this.turnoSrv.findDisponibleUsingGET(this.fecha, element.hora, '5f74ec3fc9ebc37145904f0a').subscribe(data => {
        if (data) {
          element.estado = true;
          console.log(element.estado);
          this.turno.push[element.estado];
        } else {
          element.estado = false;
        }
      });
    });
  }
}
