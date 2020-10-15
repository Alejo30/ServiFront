import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Servicio, ServicioControllerService } from 'src/app/core/Backend';

@Component({
  selector: 'app-servicio-edit',
  templateUrl: './servicio-edit.component.html',
  styleUrls: ['./servicio-edit.component.css']
})
export class ServicioEditComponent implements OnInit {

  form: FormGroup;
  id: string;
  empId: string;
  image$: Observable<any>;
  servicio: Servicio;
  task: any;
  file: any;
  name: any;
  fileRef: any;
  url: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private servSrv: ServicioControllerService,
    private activeRoute: ActivatedRoute) {
      this.buildForm();
     }

  ngOnInit(): void {

    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.servSrv.findIdUsingGET(this.id).subscribe(servicio => {
          this.form.patchValue(servicio);
          console.log(servicio);
          this.servicio = servicio;
        } );
        });
  }


  saveServicio(event: Event){
    event.preventDefault();
    const servicio = this.form.value;
    servicio.foto = this.servicio.foto;
    console.log(servicio.foto)
    if(this.form.valid){
      /* this.servSrv.editarServicioUsingPUT(servicio)
      .subscribe((newServicio)=>{
        console.log(newServicio);
        this.router.navigate(['./admin/servicios']);
      }
      ) */
      console.log(this.form.value);
    }
    
  }

  uploadFile(event){
    this.file = event.target.files[0];
    this.name = event.target.files[0].name;
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      id: [this.id],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      empresaId: ['', [Validators.required]]
    })
  }






}
