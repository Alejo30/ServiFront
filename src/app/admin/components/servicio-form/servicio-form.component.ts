import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa, EmpresaControllerService, Persona, PersonaControllerService, ServicioControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-servicio-form',
  templateUrl: './servicio-form.component.html',
  styleUrls: ['./servicio-form.component.css']
})
export class ServicioFormComponent implements OnInit {

  form: FormGroup;
  fotoBase64: any;
  empId: string;
  id: string;
  persona: Persona;
  empresa: Empresa;
  newServicio: any;
  image$: Observable<any>;
  task: any;
  file: any;
  name: any;
  fileRef: any;
  url: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private serviSrv: ServicioControllerService,
    private perSrv: PersonaControllerService,
    private empSrv: EmpresaControllerService,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage
  ) { 

   }

  ngOnInit(): void {
    this.getUser();
    this.buildForm();
  }

  uploadFile(event){
    this.file = event.target.files[0];
    this.name = event.target.files[0].name;
  }

  getUser(){
 
    this.authService.userRol().then((user) => {
      this.id  = user.displayName;
      this.perSrv.findByCedulaUsingGET(this.id).subscribe(
        rest => {
          this.persona = rest;
          this.fetchEmpresa(this.id);
        
        }
      );
    });
  }

  fetchEmpresa(id: string){
    this.empSrv.findByIdPersonaUsingGET(id).subscribe(
      rest => {
        this.empresa = rest;
        if (rest) {
          this.empId = this.empresa.ruc;
        }else{
          console.log(this.empresa);
          console.log('Empresa False');
        }
      }
    );
  }

  saveServicio(event: Event){
    event.preventDefault();
    this.newServicio = this.form.value;
    this.newServicio.empresaId = this.empId;
    this.fileRef = this.storage.ref(this.name);
    this.task = this.storage.upload(this.name, this.file);
    this.task.snapshotChanges().pipe(
      finalize(() => {
          this.image$ = this.fileRef.getDownloadURL();
          this.image$.subscribe(url => {
          this.newServicio.foto = url;
          console.log(url);
          if (this.form.valid) {
            this.serviSrv.createServicioUsingPOST(this.newServicio)
            .subscribe((newServicio) => {
              console.log('Se ha guardado y ha finalizado la subida de la imagen');
              console.log(newServicio);
              this.router.navigate(['./admin/servicios']);
            });
          }
        });
      })
    ).subscribe();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      foto: [this.url],
      empresaId: [this.empId],
    })
  }
 
}
