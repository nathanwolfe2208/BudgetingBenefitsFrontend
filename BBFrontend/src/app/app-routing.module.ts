import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
<<<<<<< Updated upstream
import { IncomeTrackerComponent } from './income-tracker/income-tracker.component';
=======
import { ManageIncomeComponent } from './manage-income/manage-income.component';
>>>>>>> Stashed changes

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
<<<<<<< Updated upstream
  { path: '', component: LoginComponent},
  { path: 'dash', component: DashComponent},
  { path: 'inc', component: IncomeTrackerComponent}
=======
  { path: 'dash', component: DashComponent },
  { path: 'manage-income', component: ManageIncomeComponent } // Ensure this is correct
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
