import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path:'' ,redirectTo:'/events' ,pathMatch:"full" } ,
  { path:'events' , component :EventsComponent } ,
  { path:'special' , component:SpecialEventsComponent ,canActivate:[AuthGuard]},
  { path:'login' ,component: LoginComponent } ,
  { path:'register' ,component:RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
