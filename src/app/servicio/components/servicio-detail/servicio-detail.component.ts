import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Servicio, ServicioControllerService } from 'src/app/core/Backend';


@Component({
  selector: 'app-servicio-detail',
  templateUrl: './servicio-detail.component.html',
  styleUrls: ['./servicio-detail.component.css']
})
export class ServicioDetailComponent implements OnInit {

  servicio: Servicio

  constructor(private route: ActivatedRoute, private serviSrv: ServicioControllerService) { }

  ngOnInit(): void {
   this.route.params.subscribe((params: Params)=> {
     const id = params.id;
     this.fetchServicio(id);   
   })
  }

  fetchServicio(id: string){
    console.log(id)
  }


}
