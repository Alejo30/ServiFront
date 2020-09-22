import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Servicio, ServicioControllerService, TurnoControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-servicio-detail',
  templateUrl: './servicio-detail.component.html',
  styleUrls: ['./servicio-detail.component.css']
})
export class ServicioDetailComponent implements OnInit {

  servicio: Servicio;

  constructor(private route: ActivatedRoute,
              private serviSrv: ServicioControllerService,
              private turnoSrv: TurnoControllerService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
   this.route.params.subscribe((params: Params)=> {
     const id = params.id;
     this.fetchServicio(id);   
   })
  }

  fetchServicio(id: string){
    console.log(id);
    this.serviSrv.findIdUsingGET(id).subscribe(
      servicio => {
        this.servicio = servicio
      }
    )
  }

  reservar(){
   this.auth.hasUser();
   
  }


}
