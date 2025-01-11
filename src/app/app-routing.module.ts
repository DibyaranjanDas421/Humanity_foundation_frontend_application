import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BloodRequestComponent } from './blood-request/blood-request.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { AuthGuard } from './guards/auth.guard';  // Import AuthGuard
import { NoAuthGuard } from './guards/no-auth.guard';  // Import NoAuthGuard

const routes: Routes = [
  // Default route (redirect to home)
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public routes
  { path: 'home', component: HomeComponent },

  // Routes accessible only if user is not logged in (protected with NoAuthGuard)
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },

  // Routes accessible only if user is logged in (protected with AuthGuard)
  { path: 'blood-request', component: BloodRequestComponent, canActivate: [AuthGuard] },

  // Other public routes
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
