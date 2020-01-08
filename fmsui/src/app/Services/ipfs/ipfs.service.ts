import { Injectable } from '@angular/core'
import ipfs from 'ipfs'

@Injectable( {
  providedIn: 'root'
} )
export class IpfsService {

  node: any
  constructor () {

  }
  // starting ipfs node
  init = async () => {
    try {
      this.node = await ipfs.create()
    } catch ( error ) {
    }
  }
  // adding data to the ipfs 
  IPFSadd = async ( data: any ) => {
    try {
      await this.init()
      const cid = await this.node.add( data )
      return this.IPFSstop( cid[ 0 ].hash )
    } catch ( error ) {
    }
  }
  // get data from the ipfs 
  IPFSget = async ( cid: any ) => {
    return new Promise( async ( resolve, reject ) => {
      try {
        await this.init()
        const receviedData = await this.node.cat( cid )
        resolve( await this.IPFSstop( receviedData.toString() ) )
      } catch ( error ) {
      }
    } )
  }
  // stoping ipfs node 
  IPFSstop = async ( data: any ) => {
    return new Promise( async ( resolve, reject ) => {
      try {
        await this.node.stop()
        resolve( data )
      } catch ( error ) {
        reject( error )
      }
    } )
  }

}
