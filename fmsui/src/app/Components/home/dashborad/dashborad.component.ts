
import { UserModel } from './../../../Models/user.model'
import { SawtoothService } from './../../../Services/Sawtooth/sawtooth.service'
import { interval, Subscription } from 'rxjs'
import { Component, OnInit, Inject } from '@angular/core'
import { IpfsService } from 'src/app/Services/ipfs/ipfs.service'
import { ApiService } from 'src/app/Services/api/api.service'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource } from '@angular/material'
export interface UserData {
  id: number
  fileHash: string[]
}
@Component( {
  selector: 'app-image-dialog',
  templateUrl: 'image-dialog.html',
} )
export class ImageDialogComponent {
  constructor (
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: any ) {
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
}
@Component( {
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: [ './dashborad.component.scss' ]
} )
export class DashboradComponent implements OnInit {
  user: UserModel
  imagePath: any
  imgURL: any
  privateKey: string
  RefreshedState = interval( 50 )
  ReceiptSubscription: Subscription
  displayedColumns: string[] = [ 'id', 'fileHash', 'view', 'delete' ]
  dataSource = null
  total: number
  constructor (
    private ipfs: IpfsService,
    private sawtooth: SawtoothService,
    private api: ApiService, public dialog: MatDialog
  ) {
    this.user = JSON.parse( sessionStorage.getItem( 'data' ) )
  }
  // preview imgs
  preview( files ) {
    if ( files.length === 0 ) {
      return
    }
    const reader = new FileReader()
    this.imagePath = files
    reader.
      readAsDataURL( files[ 0 ] )
    reader.onload = () => {
      this.imgURL = reader.result
    }
  }
  ngOnInit() {
    this.loadImages()
  }
  // load imgs
  loadImages = async () => {
    try {
      const userdta: UserData[] = []
      const d = await this.api.getStateData( this.user.stateAddress )
      JSON.parse( d ).forEach( ( imghash, i ) => {
        userdta.push( {
          id: i + 1,
          fileHash: imghash
        } )
      }
      )
      this.total = userdta.length
      this.dataSource = new MatTableDataSource( userdta )
    } catch ( error ) {
      console.log( error )
      alert( 'Welcome new User' )
    }
  }
  // upload imgs
  onUpload = async () => {
    try {
      const cid: any = await this.ipfs.IPFSadd( this.imgURL )
      if ( cid !== null ) {
        const res: any = await this.sawtooth.newTransaction( this.user.privateKey, cid, 1 )
        if ( res[ 0 ].statusText === 'Accepted' ) {
          const id = res[ 1 ].transactionIds[ 0 ]
          const data = await this.CheckReceipt( id )
          this.loadImages()
          alert( 'Your Transaction is done' )
          alert( id )
          this.imgURL = null
        } else {
          alert( 'Some issues with sawtooth' )
        }
      } else {
        alert( 'Ipfs network Problem' )
      }
    } catch ( error ) {
    }
  }
  // function for check receipt
  CheckReceipt = async id => {
    return new Promise( async ( resolve, reject ) => {
      try {
        this.ReceiptSubscription = await this.RefreshedState.subscribe( async () => {
          const data: any = await this.api.getReceipt( id )
          if ( data && data.data ) {
            this.ReceiptSubscription.unsubscribe()
            resolve( data.data )
          }
        }
        )
      } catch ( error ) {
        reject( error )
      }
    } )
  }
  // view img
  view = async hash => {
    const url = await this.ipfs.IPFSget( hash )
    const dialogRef = this.dialog.open( ImageDialogComponent, {
      width: '1000px',
      data: { url }
    } )
  }
  // remove img
  remove = async cid => {
    try {
      const res: any = await this.sawtooth.newTransaction( this.user.privateKey, cid, 0 )
      if ( res[ 0 ].statusText === 'Accepted' ) {
        const id = res[ 1 ].transactionIds[ 0 ]
        const data = await this.CheckReceipt( id )
        this.loadImages()
        alert( 'Image Deleted ' )
      } else {
        alert( 'Some issues with sawtooth' )
      }
    } catch ( error ) {
    }
  }
}
