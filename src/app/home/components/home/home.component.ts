import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mySwiper: Swiper;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user();
  }

  ngAfterViewInit(){
    this.mySwiper = new Swiper('.swiper-container');
  }


  user(){
    this.authService.hasUser().subscribe(user =>{
      console.log(user.displayName);
    })
  }





}
