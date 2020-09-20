import { Component, OnInit } from '@angular/core';
import { Servicio, ServicioControllerService } from 'src/app/core/Backend';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  servicios: Servicio[] = [];
  constructor(private serviSrv: ServicioControllerService) {
    this.fetchServicios()
   }

  ngOnInit(): void {
  }

  
  fetchServicios(){
    this.serviSrv.listServiciosUsingGET().subscribe(
      servicios => {
        this.servicios = servicios;
      }
    )
    
  }

}
