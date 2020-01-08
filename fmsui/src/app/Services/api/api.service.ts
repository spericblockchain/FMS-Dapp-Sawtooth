import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
@Injectable( {
  providedIn: 'root'
} )
export class ApiService {

  constructor ( private http: HttpClient ) { }
  // get receipt from id 
  getReceipt = async id => {
    try {
      const ReceiptResponse: any = await this.http.get( '/receipts?id=' + id ).toPromise()
      return ReceiptResponse
    } catch ( error ) {
    }
  }
  // get data from state Address 
  getStateData = async stateAddress => {
    try {
      const StateResponse: any = await this.http.get( '/state/' + stateAddress ).toPromise()
      return atob( StateResponse.data )
    } catch ( error ) {
      return error
    }

  }
  // sending new transaction to the restapi
  postBatchList = async ( batchListBytes, batchHeaderBytes ) => {
    const postBatchListURL = '/batches'
    const fetchOptions = {
      method: 'POST',
      body: batchListBytes,
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }
    const res = await window.fetch( postBatchListURL, fetchOptions )
    return [ res, batchHeaderBytes ]
  }
}
