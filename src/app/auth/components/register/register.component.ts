import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Direccion, EmpresaControllerService, PersonaControllerService } from 'src/app/core/Backend';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { AuthService } from "./../../../core/services/auth.service";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  formE: FormGroup;
  formD: FormGroup;
  emp: boolean;
  fotoBase64: any;
  value: any;
  isEditable = false;
  direccion: any ={
    callePrincipal: '',
    calleSecundaria: '',
    numero: '',
  } 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private perSrv: PersonaControllerService,
    private empSrv: EmpresaControllerService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  register(event: Event){
    event.preventDefault();
    if (this.form.valid) {
      this.isEditable = true;
      console.log(this.isEditable)
      this.value = this.form.value;
      this.authService.createUser(this.value.correo, this.value.password)
      .then((result)=>{
        result.user.updateProfile({
          displayName: this.value.cedula
        }).catch(error =>{
          console.error(error)
        })

        /* const configuracion = {
          url: 'http://localhost:4200/home'
        }

        result.user.sendEmailVerification(configuracion).catch(error =>{
          console.error(error)
        })

        this.authService.logout();
        alert('Bienvenido' + this.value.nombre + 'Debe Realizar el proceso de verificacion') */
        this.openDialog()
       
      })
      .catch(() =>{
        alert('No se ha podido Registrar')
      });
     
    }
  }

  regis(){
     if (this.formE.valid) {
      const empresa = this.formE.value;
      this.direccion = this.formD.value;
      empresa.direccion =  this.direccion
       
      empresa.personaId = this.value.cedula
      console.log(empresa)
      console.log(this.direccion)
      this.empSrv.createEmpresaUsingPOST(empresa).subscribe(data => {
        console.log(data);
      })   
      console.log(empresa.personaId)
      console.log(empresa)
     
    }else{
      console.log('No es valido');
    }    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: 'Gracias por Elegirnos'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {  
        console.log('Iniciando')
        this.value.cuentaEmpresario = this.emp = true
        this.RegisPerson(this.value)
       
      }else{
        
        this.RegisPerson(this.value)
        this.router.navigate(['/auth/login'])
      }
    })
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', Validators.required],
      foto: [this.fotoBase64, Validators.required] ,
      password: ['', Validators.required],
      cuentaEmpresario: [this.emp]
    })

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

  private RegisPerson(value){
    this.perSrv.createPersonaUsingPOST(value).subscribe(
      persona =>{
        console.log(persona);
      }
    )}
 

}
