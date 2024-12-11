import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { StatisticsComponent } from "../balances/statistics/statistics.component";
import { BalancesComponent } from "../balances/balances.component";
import { DetailComponent } from "../balances/detail/detail.component";

export const dashBoardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: StatisticsComponent },
      { path: 'balances', component: BalancesComponent },
      { path: 'detail', component: DetailComponent },
    ],
  }
];