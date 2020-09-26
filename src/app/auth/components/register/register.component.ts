import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { PersonaControllerService } from 'src/app/core/Backend';
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private perSrv: PersonaControllerService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  register(event: Event){
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.correo, value.password)
      .then((result)=>{
        result.user.updateProfile({
          displayName: value.cedula
        }).catch(error =>{
          console.error(error)
        })

        const configuracion = {
          url: 'http://localhost:4200/home'
        }

        result.user.sendEmailVerification(configuracion).catch(error =>{
          console.error(error)
        })

        this.authService.logout();
        alert('Bienvenido' + value.nombre + 'Debe Realizar el proceso de verificacion')
        this.router.navigate(['/auth/login'])
        console.log(value)
        this.RegisPerson(value)
      })
      .catch(() =>{
        alert('No se ha podido Registrar')
      });
     
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
      cuentaEmpresario: ['']
    })

    this.formE = this.formBuilder.group({
      ruc: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
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
