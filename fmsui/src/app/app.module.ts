import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MainNavComponent } from './Components/other/main-nav/main-nav.component'
import {
  HomeComponent,
  PrivateKeyDialogComponent
} from './Components/home/home.component'
import { MaterialModule } from './Modules/material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'
import { DashboradComponent, ImageDialogComponent } from './Components/home/dashborad/dashborad.component'
import { HttpClientModule } from '@angular/common/http';



@NgModule( {
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    PrivateKeyDialogComponent,
    DashboradComponent, ImageDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // EffectsModule.forRoot( [ LoginEffects ] )
  ],
  entryComponents: [ PrivateKeyDialogComponent, ImageDialogComponent ],
  // providers: [ LoginService ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
