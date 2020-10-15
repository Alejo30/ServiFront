import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Persona, PersonaControllerService } from 'src/app/core/Backend';
import { AuthService } from './../../../core/services/auth.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  persona: Persona;
  focus;
  focus1;
  timerInterval
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private perSrv: PersonaControllerService,
    public dialog: MatDialog
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
         console.log(r);
         this.openDialog();
         this.router.navigate(['/admin/']);
      })
      .catch((err) => {
        
        this.openDialogErrorLogin();
      });
    }
  }

  openDialog(){
   Swal.fire({
    title: 'Bienvenido!',
    timer: 2000,
    timerProgressBar: true,
    willOpen: () => {
      Swal.showLoading()
      this.timerInterval = setInterval(() => {
      const content = Swal.getContent();
      if (content) {
        const b = content.querySelector('b');
        if (b) {
        }
      }
    }, 100);
  },
    onClose: () => {
    clearInterval(this.timerInterval);
    }
  }).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer');
    }
    });
  }

  openDialogErrorLogin(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'La Contraseña o el Email estan incorrectos!',
    });
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
       }else{
       }
     }
   );
  }

}
