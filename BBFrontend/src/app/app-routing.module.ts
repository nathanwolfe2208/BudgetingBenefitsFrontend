import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { IncomeTrackerComponent } from './income-tracker/income-tracker.component';
import { ManageIncomeComponent } from './manage-income/manage-income.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dash', component: DashComponent },
  { path: 'inc', component: IncomeTrackerComponent }, // Ensure this path is correct
  { path: 'manage-income', component: ManageIncomeComponent } // Ensure this path is correct
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
