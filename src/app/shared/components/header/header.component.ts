import { Component, OnInit } from '@angular/core';
import { Persona, PersonaControllerService } from 'src/app/core/Backend';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: string;
  persona: Persona;
  visible: boolean;

  constructor(private authService: AuthService, 
              private perSrv: PersonaControllerService,) { }

  ngOnInit(): void {
    this.getP();
  }

  getP(){
    this.authService.hasUser().subscribe(user => {
      if (user) {
        console.log('true');
        this.visible = true;
        const id = user.displayName;
        this.perSrv.findByCedulaUsingGET(id).subscribe(
          rest => {
            this.persona = rest;
            console.log(rest);
            this.user = this.persona.nombre;
          }
        );
      } else {
        console.log('false');
        this.visible = false;
      }
    });
  }

}
