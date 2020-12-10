import { CarouselComponent } from './components/home/carousel/carousel.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { FraseCelebreComponent } from './components/frase-celebre/frase-celebre.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TimeTaskComponent } from './components/time-task/time-task.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FraseCelebreComponent,
    LoginComponent,
    RegisterComponent,
    TimeTaskComponent,
    ListTaskComponent,
    HomeComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
