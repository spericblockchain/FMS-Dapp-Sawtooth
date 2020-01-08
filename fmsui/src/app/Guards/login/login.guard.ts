import { SawtoothService } from './../../Services/Sawtooth/sawtooth.service'
import { UserModel } from './../../Models/user.model'
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'


@Injectable( {
  providedIn: 'root'
} )
export class LoginGuard implements CanActivate {
  user: UserModel = {
    privateKey: '', stateAddress: '', cidHash: []
  }
  exp = new RegExp( '^[a-fA-F0-9]{64}$' )
  constructor ( private sawtooth: SawtoothService, private route: Router ) { }
  async canActivate(): Promise<boolean> {
    this.user.privateKey = sessionStorage.getItem( 'key' )
    if ( this.exp.test( this.user.privateKey ) ) {
      this.user.stateAddress = this.sawtooth.genAddress( this.sawtooth.genPublickey( this.user.privateKey ) )
      sessionStorage.clear()
      sessionStorage.setItem( 'data', JSON.stringify( this.user ) )
      return true
    }
    alert( 'Invalid Private Key' )
    this.route.navigateByUrl( '/' )
  }
}
