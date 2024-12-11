import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashBoardRoutes } from './dashboard.routes';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashBoardRoutes),
    SharedModule
  ],
  exports: [
    DashboardComponent,
    RouterModule
  ]
})
export class DashboardModule { }
