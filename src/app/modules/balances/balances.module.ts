import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BalancesComponent } from './balances.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { BalancesOrderPipe } from '../../shared/pipes/balances-order.pipe';
import { SharedModule } from '../../shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';



@NgModule({
  declarations: [
    BalancesComponent,
    StatisticsComponent,
    DetailComponent,
    BalancesOrderPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardModule
  ]
})
export class BalancesModule { }
