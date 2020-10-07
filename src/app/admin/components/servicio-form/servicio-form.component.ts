import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa, EmpresaControllerService, Persona, PersonaControllerService, ServicioControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';

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
  constructor(
    private formBuilder: FormBuilder,
    private serviSrv: ServicioControllerService,
    private perSrv: PersonaControllerService,
    private empSrv: EmpresaControllerService,
    private router: Router,
    private authService: AuthService
  ) { 
    this.buildForm();
   }

  ngOnInit(): void {
    this.getP();
  }

  getP(){
    this.authService.userRol().then((user) => {
      this.id  = user.displayName;
      console.log(user.displayName);
      this.perSrv.findByCedulaUsingGET(this.id).subscribe(
        rest => {
          this.persona = rest;
          console.log(rest);
          this.fetchEmpresa(this.id);
          console.log('getP');
        }
      );
    });
  }

  fetchEmpresa(id: string){
    console.log(id);
    this.empSrv.findByIdPersonaUsingGET(id).subscribe(
      rest => {
        this.empresa = rest;
        if (rest) {
          console.log(this.empresa);
          console.log(rest);
        }else{
          console.log(this.empresa);
          this.empId = this.empresa.ruc;
          const servicio = this.form.value;
          servicio.empresaId = this.empId;
          console.log('Empresa True');
        }
      }
    );
  }

  saveServicio(){
    if (this.form.valid) {
      /* this.serviSrv.createServicioUsingPOST(servicio)
      .subscribe((newServicio) => {
        console.log(newServicio);
        this.router.navigate(['./admin/servicios']);
      }); */
    }
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      foto: this.fotoBase64,
      empresaId: [this.empId, [Validators.required]],
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
