import { Component, OnInit } from '@angular/core';
import { Empresa, EmpresaControllerService, PersonaControllerService, ServicioControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-servicio-list',
  templateUrl: './servicio-list.component.html',
  styleUrls: ['./servicio-list.component.css']
})
export class ServicioListComponent implements OnInit {

  persona: any;
  servicios = [];
  empresa: Empresa;
  id: string;
  empId: string;
  displayedColumns: string[] =['nombre', 'precio', 'acciones'];
  timerInterval;

  constructor(private serviSrv: ServicioControllerService,
              private authService: AuthService,
              private perSrv: PersonaControllerService,
              private empSrv: EmpresaControllerService,) { }

  ngOnInit(): void {
    this.getP();
  }

  getP(){
    this.authService.userRol().then((user) => {
      this.id = user.displayName;
      console.log(user.displayName);
      this.perSrv.findByCedulaUsingGET(this.id).subscribe(
        rest => {
          this.persona = rest;
          console.log(rest);
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
          console.log(this.empresa)
          this.fetchServicios(this.empId);
        }else{
          console.log(this.empresa);
          console.log('Empresa False');
        }
      }
    );
  }

  fetchServicios(id: string){
    this.serviSrv.findServiciosEmpresaUsingGET(id).subscribe(
      servicios => {
          this.servicios = servicios;
      }
    )
  }


  openDeleteS(id: string){
    Swal.fire({
      title:  '¿Estás seguro que quieres eliminar este Servicio?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Servicio eliminado con exito!', '', 'success');
        this.serviSrv.deleteServicioUsingDELETE(id).subscribe(
          data => {
           this.fetchServicios(this.empId);
           console.log(data);
          }
        )
      } else if (result.isDenied) {
        Swal.fire('Ok', '', 'info');
      }
    })
   }


  deleteProduct(id: string){
    this.serviSrv.deleteServicioUsingDELETE(id).subscribe(
      data => {
       this.fetchServicios(this.empId);
       console.log(data);
       window.alert('Eliminado');
      }
    )
  }

}
