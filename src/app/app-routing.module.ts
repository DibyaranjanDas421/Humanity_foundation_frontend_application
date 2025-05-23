import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BloodRequestComponent } from './blood-request/blood-request.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {DonorSearchComponentComponent} from './donor-search-component/donor-search-component.component';
import {ReciverRequestComponent} from './reciver-request/reciver-request.component';
import {ProfileComponent}  from'./profile/profile.component';
import { CurrentBloodRequestComponent } from './current-blood-request/current-blood-request.component';

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
  { path: 'blood-request', component: BloodRequestComponent, canActivate: [AuthGuard] },
  { path: 'receiver-request', component: ReciverRequestComponent, canActivate: [AuthGuard] },

  { path: 'donor-search', component: DonorSearchComponentComponent, canActivate: [AuthGuard] }, 

  // Routes accessible only if user is logged in (protected with AuthGuard)


  // Other public routes
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {path:'profile',component:ProfileComponent},
  {path:'CurrentBloodRequest',component:CurrentBloodRequestComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
