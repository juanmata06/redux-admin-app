//* Angular imports:
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//* Services, guards, configs imports:
import { AuthGuard } from './guards/auth.guard';
import { dashBoardRoutes } from './modules/dashboard/dashboard.routes';

//* APP imports:
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    children: dashBoardRoutes,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
