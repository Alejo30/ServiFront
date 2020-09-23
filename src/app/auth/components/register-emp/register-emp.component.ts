import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa, PersonaControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.css']
})
export class RegisterEmpComponent implements OnInit {

  form: FormGroup;
  formE: FormGroup;
  empresa: Empresa;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private perSrv: PersonaControllerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  register(event: Event){
    event.preventDefault();
    const value = this.form.value;
      this.authService.createUser(value.correo, value.password)
      .then(()=>{
        
        this.perSrv.createPersonaUsingPOST(value).subscribe(
          persona =>{
            alert('Persona Creada');
            alert('Su Usuario es su correo');
            console.log(persona);
          }
        )
        this.router.navigate(['/auth/login'])
        console.log(value)
      });
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
      cuentaEmpresario: ['true'],
      foto: [''],
      
      callePrincipal: ['', Validators.required],
      calleSecundaria: ['', Validators.required],
      numero: ['', Validators.required]
    })
    this.formE = this.formBuilder.group({
      ruc: ['', Validators.required],
      nombreE: ['', Validators.required],
    })
  }

}
