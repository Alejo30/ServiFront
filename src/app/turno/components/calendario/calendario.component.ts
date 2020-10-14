import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TurnoControllerService } from 'src/app/core/Backend';
import { CalendarioDataSource, CalendarioItem } from './calendario-datasource';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CalendarioItem>;
  dataSource: CalendarioDataSource;
  disponible: boolean;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado', 'Domingo' ];

  constructor(private turnoSrv: TurnoControllerService,){

  }

  ngOnInit() {
    this.dataSource = new CalendarioDataSource();
    this.prueba();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  prueba(){
    

  }
}
