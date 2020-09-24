import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonaControllerService } from 'src/app/core/Backend';
import { AuthService } from "./../../../core/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  emp: boolean;
  fotoBase64: any;

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
    if (this.form.valid) {
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
