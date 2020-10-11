import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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

  visible: boolean;

  constructor(private authService: AuthService,
              private perSrv: PersonaControllerService,
              private formBuilder: FormBuilder,
              private empSrv: EmpresaControllerService,) {  }

  ngOnInit(): void {
    this.buildForm();
    this.getUser();
  }

  uploadFile(event){
    this.file = event.target.files[0];
    this.name = event.target.files[0].name;
  }

  getUser(){
    this.authService.hasUser().subscribe(user => {
      if (user) {
        console.log('true');
        const id = user.displayName;
        this.perSrv.findByCedulaUsingGET(id).subscribe(
          rest => {
            this.persona = rest;
            this.form.patchValue(rest);
            this.fetchEmpresa(id);
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

  savePerson(event: Event){

  }

  saveEmp(){

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
