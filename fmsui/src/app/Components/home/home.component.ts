import { UserModel } from './../../Models/user.model'
import { Component, OnInit, Inject } from '@angular/core'
import * as crypto from 'crypto-browserify';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-private-key-dialog',
  templateUrl: 'private-key-dialog.html',
} )
export class PrivateKeyDialogComponent {
  user: UserModel
  // privateKey: string
  constructor (
    public dialogRef: MatDialogRef<PrivateKeyDialogComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: any ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit {
  privateKey: string
  exp = new RegExp( `^[a-fA-F0-9]{64}$` )
  constructor ( private route: Router, public dialog: MatDialog ) { }
  ngOnInit() { }
  openDialog(): void {
    const id = crypto.randomBytes( 32 ).toString( 'hex' )
    const dialogRef = this.dialog.open( PrivateKeyDialogComponent, {
      width: '650px',
      data: { ID: id }
    } )
  }
  login = () => {
    if ( this.privateKey ) {
      sessionStorage.setItem( 'key', this.privateKey )
      this.route.navigateByUrl( '/Dashboard' )
    } else {
      alert( 'Plz Enter Private Key' )
      this.privateKey = undefined
    }
  }
}
