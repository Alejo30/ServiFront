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
  newServicio: any;
  constructor(
    private formBuilder: FormBuilder,
    private serviSrv: ServicioControllerService,
    private perSrv: PersonaControllerService,
    private empSrv: EmpresaControllerService,
    private router: Router,
    private authService: AuthService
  ) { 

   }

  ngOnInit(): void {
    this.getP();
    this.buildForm();
  }

  getP(){
    this.authService.userRol().then((user) => {
      this.id  = user.displayName;
      this.perSrv.findByCedulaUsingGET(this.id).subscribe(
        rest => {
          this.persona = rest;
          this.fetchEmpresa(this.id);
        }
      );
    });
  }

  fetchEmpresa(id: string){
    this.empSrv.findByIdPersonaUsingGET(id).subscribe(
      rest => {
        this.empresa = rest;
        if (rest) {
          this.empId = this.empresa.ruc;
        }else{
          console.log(this.empresa);
          console.log('Empresa False');
        }
      }
    );
  }

  saveServicio(event: Event){
    event.preventDefault();
    this.newServicio = this.form.value;
    this.newServicio.empresaId = this.empId;
    if (this.form.valid) {
      this.serviSrv.createServicioUsingPOST(this.newServicio)
      .subscribe((newServicio) => {
        console.log(newServicio);
        this.router.navigate(['./admin/servicios']);
      });
    }
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      foto: this.fotoBase64,
      empresaId: [this.empId],
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
