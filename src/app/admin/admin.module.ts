import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ServicioFormComponent } from './components/servicio-form/servicio-form.component';
import { ServicioListComponent } from './components/servicio-list/servicio-list.component';
import { ServicioEditComponent } from './components/servicio-edit/servicio-edit.component';
import { PerfilComponent } from './components/perfil/perfil.component';



@NgModule({
  declarations: [NavComponent, DashboardComponent, ServicioFormComponent, ServicioListComponent, ServicioEditComponent, PerfilComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
