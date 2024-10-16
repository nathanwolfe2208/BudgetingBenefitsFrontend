import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './login/auth/auth.interceptor';
import { DashComponent } from './dash/dash.component';
<<<<<<< Updated upstream
import { IncomeTrackerComponent } from './income-tracker/income-tracker.component';

=======
import { ManageIncomeComponent } from './manage-income/manage-income.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    DashComponent,
<<<<<<< Updated upstream
    IncomeTrackerComponent
=======
    ManageIncomeComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, // Add FormsModule here
    HttpClientModule  
  ],
  providers: [
    provideClientHydration(), { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
