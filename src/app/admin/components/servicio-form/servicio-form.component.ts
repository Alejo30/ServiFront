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
  fotoBase64: any;

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
    if (this.form.valid) {
      const servicio = this.form.value;
      this.serviSrv.createServicioUsingPOST(servicio)
      .subscribe((newServicio)=>{
        console.log(newServicio);
        this.router.navigate(['./admin/servicios-list'])
      })
    }
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      foto:this.fotoBase64,
    })
  }

  public picked(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fotoBase64 = reader.result;
    };
  }

}
