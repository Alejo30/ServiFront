import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Servicio, ServicioControllerService } from 'src/app/core/Backend';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-servicio-edit',
  templateUrl: './servicio-edit.component.html',
  styleUrls: ['./servicio-edit.component.css']
})
export class ServicioEditComponent implements OnInit {

  timerInterval;
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
  foto: any;
  cambio = false;
  value: any;
  cargando: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private servSrv: ServicioControllerService,
    private activeRoute: ActivatedRoute,
    private storage: AngularFireStorage) {
      this.buildForm();
     }

  ngOnInit(): void {
    this.getService();
  }

  openUpdateS(){
    Swal.fire({
      title:  '¿Quieres guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Datos guardados con exito!', '', 'success');
        this.saveServicio();
      } else if (result.isDenied) {
        Swal.fire('Ok', '', 'info');
        this.getService();
      }
    });
   }

   getService(){
    this.cargando = false;
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.servSrv.findIdUsingGET(this.id).subscribe(servicio => {
          this.form.patchValue(servicio);
          console.log(servicio);
          this.servicio = servicio;
          this.cargando = true;
        } );
        });
   }


  saveServicio(){
    this.value = this.form.value;
    console.log(this.cambio)
    if (this.cambio) {
      this.fileRef = this.storage.ref(this.name);
      this.task = this.storage.upload(this.name, this.file);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          console.log('en el finalice');
          this.image$ = this.fileRef.getDownloadURL();
          this.image$.subscribe(url => {
            this.value.foto = url;
            console.log(this.value.foto);
            this.servSrv.editarServicioUsingPUT(this.value).subscribe(rest => {
              console.log('El elemento guardado' + this.value);
              this.router.navigate(['/admin/servicios']);
            })
          })
        })
      ).subscribe();
    } else {
      this.value.foto = this.servicio.foto;
      this.servSrv.editarServicioUsingPUT(this.value).subscribe(rest => {
        console.log('El elemento guardado' + this.value);
        this.router.navigate(['/admin/servicios']);
      });
    }
    
  }

  uploadFile(event){
    this.file = event.target.files[0];
    this.name = event.target.files[0].name;
    this.cambio = true;
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
