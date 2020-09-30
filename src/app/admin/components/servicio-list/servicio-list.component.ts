import { Component, OnInit } from '@angular/core';
import { ServicioControllerService } from 'src/app/core/Backend';


@Component({
  selector: 'app-servicio-list',
  templateUrl: './servicio-list.component.html',
  styleUrls: ['./servicio-list.component.css']
})
export class ServicioListComponent implements OnInit {

  servicios = [];

  displayedColumns: string[] =['nombre', 'precio', 'acciones'];
  
  constructor(private serviSrv: ServicioControllerService) { }

  ngOnInit(): void {
    this.fetchServicios();
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
