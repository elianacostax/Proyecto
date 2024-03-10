import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListSpacesComponent } from './components/list-spaces/list-spaces.component';
import { DetailsSpacesComponent } from './components/details-spaces/details-spaces.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BookingComponent } from './components/booking/booking.component';
import { ComputerListComponent } from './components/computer-list/computer-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminReservaComponent } from './components/admin-reserva/admin-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ListSpacesComponent,
    DetailsSpacesComponent,
    CalendarComponent,
    BookingComponent,
    ComputerListComponent,
    UserProfileComponent,
    AdminReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
