import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { TurnoControllerService } from 'src/app/core/Backend';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  form: FormGroup;
  header: any;
  options: any;
  fecha: string;
  disponible: boolean;
 

  constructor(private formBuilder: FormBuilder, private turnoSrv: TurnoControllerService) { }

  ngOnInit(): void {
    this.buildForm();
    
  }

  prueba(){
    console.log('Estoy haciendo la prueba');
    this.turnoSrv.findTurnoDisponibleUsingGET("2020-09-30", "11:00").subscribe(
      data => {
          this.disponible = data;
          console.log(this.disponible);
      }
    )

  }


  private buildForm(){
    this.form = this.formBuilder.group({
      fecha : [this.fecha, Validators.required],
      hora: ['', Validators.required],
      servicioId: ['', Validators.required],
      personaId: ['', Validators.required],
    })
    
  }

}
