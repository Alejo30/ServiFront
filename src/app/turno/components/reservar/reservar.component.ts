import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';

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
  
  calendarOptions: CalendarOptions = {
    locale: esLocale,
    editable: true,
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-09-01' },
      { title: 'event 2', date: '2020-09-10' }
    ]
    
  };
            

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  handleDateClick(arg) {
    this.fecha = arg.dateStr
    alert('date click! ' + arg.dateStr)
    this.form.setValue({
      fecha : [this.fecha],
      hora: ['']
    })
   console.log(this.fecha)

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
