import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, AfterViewInit {

  mySwiper: Swiper;
  images: string[] = [
    '../assets/images/imagen 1.jpg',
    '../assets/images/imagen 2.jpg',
    '../assets/images/imagen 3.jpg',
    '../assets/images/imagen 4.jpg',
    '../assets/images/img3.jpeg',
  ];
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    }

}
