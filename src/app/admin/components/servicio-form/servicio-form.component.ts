import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioControllerService } from 'src/app/core/Backend';

@Component({
  selector: 'app-servicio-form',
  templateUrl: './servicio-form.component.html',
  styleUrls: ['./servicio-form.component.css']
})
export class ServicioFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviSrv: ServicioControllerService,
    private router: Router
  ) { 
    this.buildForm()
   }

  ngOnInit(): void {
  }

  saveServicio(event: Event){
    event.preventDefault();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
    })
  }

}
