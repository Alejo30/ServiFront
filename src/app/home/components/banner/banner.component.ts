import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  images: string[] =[
    '../assets/images/imagen 1.jpg',
    '../assets/images/imagen 2.jpg',
    '../assets/images/imagen 3.jpg',
    '../assets/images/imagen 4.jpg',
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
