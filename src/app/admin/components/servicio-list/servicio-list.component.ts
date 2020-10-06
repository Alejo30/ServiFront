import { Component, OnInit } from '@angular/core';
import { PersonaControllerService, ServicioControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-servicio-list',
  templateUrl: './servicio-list.component.html',
  styleUrls: ['./servicio-list.component.css']
})
export class ServicioListComponent implements OnInit {

  persona: any;
  servicios = [];
  id: string;
  displayedColumns: string[] =['nombre', 'precio', 'acciones'];
  
  constructor(private serviSrv: ServicioControllerService,
              private authService: AuthService,
              private perSrv: PersonaControllerService,) { }

  ngOnInit(): void {
    this.getP();
  }

  getP(){
    this.authService.userRol().then((user)=> {
      this.id = user.displayName;
      console.log(user.displayName);
      this.perSrv.findByCedulaUsingGET(this.id).subscribe(
        rest => {
          this.persona = rest;
          console.log(rest);
          this.fetchServicios();
        }
      );
    });
  }

  fetchServicios(){
    this.serviSrv.listServiciosUsingGET()
    .subscribe(servicios => {
      this.servicios = servicios;
    });
  }

  deleteProduct(id: string){
    this.serviSrv.deleteServicioUsingDELETE(id).subscribe(
      data => {
        this.fetchServicios();
        console.log(data);
        window.alert('Eliminado');
      }
    )
  }

}
