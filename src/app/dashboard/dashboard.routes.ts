import { Routes } from "@angular/router";

import { StatisticComponent } from "../balances/statistic/statistic.component";
import { BalancesComponent } from "../balances/balances.component";
import { DetailComponent } from "../balances/detail/detail.component";

export const dashBoardRoutes: Routes = [
  { path: '', component: StatisticComponent },
  { path: 'balances', component: BalancesComponent },
  { path: 'detail', component: DetailComponent },
];