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
      this.authService.createUser(value.email, value.password)
      .then(()=>{
        this.router.navigate(['/auth/login'])
      })
    }
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNac: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      isEmpre: ['']
    })
  }

}
