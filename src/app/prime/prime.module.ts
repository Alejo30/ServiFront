import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FullCalendarModule,
    InputTextModule,
    CalendarModule
  ],
  exports:[
    FullCalendarModule,
    InputTextModule,
    CalendarModule
  ]
})
export class PrimeModule { }
