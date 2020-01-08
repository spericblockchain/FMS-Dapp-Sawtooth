import { LoginGuard } from './Guards/login/login.guard'
import { DashboradComponent } from './Components/home/dashborad/dashborad.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './Components/home/home.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'Dashboard', component: DashboradComponent, canActivate: [ LoginGuard ]
  }
]

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
