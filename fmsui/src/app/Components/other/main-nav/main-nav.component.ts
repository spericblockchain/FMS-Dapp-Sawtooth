import { OnInit } from '@angular/core'


import { Component, Input } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { Router } from '@angular/router'



@Component( {
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: [ './main-nav.component.scss' ]
} )
export class MainNavComponent implements OnInit {
  @Input()
  ContentType: number
  ipfsConnect$: Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe( Breakpoints.XSmall )
    .pipe( map( result => result.matches ) )

  constructor (
    private breakpointObserver: BreakpointObserver,
    private route: Router
  ) { }
  ngOnInit() {
  }
  logOut() {
    sessionStorage.clear()
    this.route.navigateByUrl( '/' )
  }
}
