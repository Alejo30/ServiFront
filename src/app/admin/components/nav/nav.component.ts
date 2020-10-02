import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from "./../../../core/services/auth.service";
import { Persona, PersonaControllerService } from 'src/app/core/Backend';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  id: string;
  persona: Persona;
  visible: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private perSrv: PersonaControllerService) {
                this.getP();
              }

 
  logout(){
    this.authService.logout()
    .then(()=>{
      this.router.navigate(['./home'])
    });
  }

  getP(){
    this.authService.userRol().then((user)=> {
      this.id = user.displayName;
      console.log(user.displayName);
      this.perSrv.findByCedulaUsingGET(this.id).subscribe(
        rest => {
          if (rest.cuentaEmpresario) {
            this.visible = true;
          }else{
            this.visible = false;
          }
        }
      );
    });
  }

}
