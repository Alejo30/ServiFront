import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona, PersonaControllerService } from 'src/app/core/Backend';
import { AuthService } from "./../../../core/services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  persona: Persona;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private perSrv: PersonaControllerService
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }


  login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.login(value.email, value.password)
      .then((result) => {
         const r = result.user.displayName;
         this.BuscarPer(r);
         console.log(r)
         this.router.navigate(['/admin/']);
      })
      .catch(() =>{
        alert('El Email o la Contraseña son incorrectos')
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  private BuscarPer(cedula: string){
   this.perSrv.findByCedulaUsingGET(cedula).subscribe(
     persona => {
       this.persona = persona;
       if (this.persona.cuentaEmpresario) {
         alert('Es Empresario');
       }else{
        alert('Es un Cliente');
       }

     }
   )
  }

}
