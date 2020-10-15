import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Empresa, EmpresaControllerService, Persona, PersonaControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  persona: Persona;
  image$: Observable<any>;
  empresa: Empresa;
  value: any;
  foto: any;
  form: FormGroup;
  empId: string;
  emp: boolean;
  formE: FormGroup;
  formD: FormGroup;
  direccion: any = {
    callePrincipal: '',
    calleSecundaria: '',
    numero: '',
  };
  task: any;
  file: any;
  name: any;
  fileRef: any;
  url: any;
  cargando: boolean;
  visible: boolean;

  constructor(private authService: AuthService,
              private perSrv: PersonaControllerService,
              private formBuilder: FormBuilder,
              private empSrv: EmpresaControllerService,
              private storage: AngularFireStorage) {  }

  ngOnInit(): void {
    this.getUser();
    this.buildForm();
  }

  uploadFile(event){
    this.file = event.target.files[0];
    this.name = event.target.files[0].name;
  }

  getUser(){
    this.cargando = false;
    this.authService.hasUser().subscribe(user => {
      if (user) {
        console.log('true');
        const id = user.displayName;
        this.perSrv.findByCedulaUsingGET(id).subscribe(
          rest => {
            this.persona = rest;
            console.log(this.persona);
            this.form.patchValue(rest);
            this.fetchEmpresa(id);
            this.foto =  this.persona.foto;
            this.cargando = true;
          }
        );
      } else {
        console.log('false');
      }
    });
  }

  fetchEmpresa(id: string){
    this.empSrv.findByIdPersonaUsingGET(id).subscribe(
      rest => {
        this.empresa = rest;
        if (rest) {
          this.visible = true;
          const empDir = this.empresa.direccion;
          console.log(this.empresa);
          this.formE.patchValue(this.empresa);
          this.formD.patchValue(empDir);
        }else{
          this.visible = false;
          console.log(this.empresa);
        }
      }
    );
  }

  updatePerson(event: Event){
    event.preventDefault();
    this.value = this.form.value;
    this.fileRef = this.storage.ref(this.name);
    this.task = this.storage.upload(this.name, this.file);
    this.task.snapshotChanges().pipe(
      finalize(() =>{
        this.image$ = this.fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          this.value.foto = url;
          console.log(this.value);
          this.perSrv.updatePersonaUsingPUT(this.value).subscribe(res => {
          console.log(this.value);
          });
        });
      })
    ).subscribe();
  }

  updateEmp(){
    const empresa = this.formE.value;
    this.direccion = this.formD.value;
    empresa.direccion =  this.direccion;
    empresa.personaId = this.persona.cedula;
    console.log(empresa);
    console.log(this.direccion);
    this.empSrv.editarEmpresaUsingPUT(empresa).subscribe(
      response =>{
        console.log(empresa);
      }
    )
  }

  deleteUser(){
    this.authService.userRol().then(user => {
      user.delete().then(() =>{
        console.log('Usuario Eliminado');
      });
    })
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', Validators.required],
      foto: ['', Validators.required] ,
      password: ['', Validators.required],
      cuentaEmpresario: [this.emp]
    });

    this.formE = this.formBuilder.group({
      ruc: ['', Validators.required],
      nombre: ['', Validators.required],
      personaId: [''],
      direccion: [this.direccion]
    })

    this.formD = this.formBuilder.group({
      callePrincipal: ['', Validators.required],
      calleSecundaria: ['', Validators.required],
      numero: ['', Validators.required]
    });
  }

}
