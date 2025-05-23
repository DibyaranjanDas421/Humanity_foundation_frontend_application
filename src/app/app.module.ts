import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Mycomponents/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BloodRequestComponent } from './blood-request/blood-request.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MessageComponent } from './message/message.component';
import { FooterComponent } from './footer/footer.component';
import { KeycloakAngularModule } from 'keycloak-angular';
import { DonorSearchComponentComponent } from './donor-search-component/donor-search-component.component';
import { ReciverRequestComponent } from './reciver-request/reciver-request.component';
import { ProfileComponent } from './profile/profile.component';
import { CurrentBloodRequestComponent } from './current-blood-request/current-blood-request.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    BloodRequestComponent,
    AboutUsComponent,
    ContactUsComponent,
    MessageComponent,
    FooterComponent,
    DonorSearchComponentComponent,
    ReciverRequestComponent,
    ProfileComponent,
    CurrentBloodRequestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}