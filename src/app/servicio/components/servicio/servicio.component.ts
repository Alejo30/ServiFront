import { Component, Input, OnInit, Output } from '@angular/core';
import { Servicio } from 'src/app/core/Backend';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent implements OnInit {

  @Input() servicio: Servicio
  constructor() { }

  ngOnInit(): void {
  }

}
