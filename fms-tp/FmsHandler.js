'use strict'

const { TransactionHandler } = require('sawtooth-sdk/processor/handler'),
	{
		InvalidTransaction,
		InternalError
	} = require('sawtooth-sdk/processor/exceptions'),
	crypto = require('crypto'),
	{ TextEncoder, TextDecoder } = require('text-encoding/lib/encoding')

const encoder = new TextEncoder('utf8'),
	decoder = new TextDecoder('utf8')
// hashing data using sha512
function hash(data) {
	return crypto
		.createHash('sha512')
		.update(data)
		.digest('hex')
}

const FAMILY_NAME = 'FMS_CHAIN',
	NAMESPACE = hash(FAMILY_NAME).substring(0, 3)
// Get address from public Address
function getAddress(publicKey) {
	const keyHash = hash(publicKey),
		nameHash = hash(FAMILY_NAME)
	return nameHash.slice(0, 20) + keyHash.slice(0, 50)
}
// Add image to the State
async function AddImage(context, address, data) {
	const state = await context.getState([address])
	let stateData = decoder.decode(state[address])
	if (!stateData) {
		const dataBytes = encoder.encode(JSON.stringify([data])),
			entries = {
				[address]: dataBytes
			}
		const Status = await context.setState(entries)
		context.addReceiptData(Buffer.from(Status, 'utf8'))
		return Status
	} else {
		console.log('Old data')
		let arrayData = JSON.parse(stateData)
		arrayData.push(data)
		const dataBytes = encoder.encode(JSON.stringify(arrayData)),
			entries = {
				[address]: dataBytes
			}
		const Status = await context.setState(entries)
		context.addReceiptData(Buffer.from(Status, 'utf8'))
		return Status
	}
}
// Delete image form state
async function DeleteImage(context, address, data) {
	const state = await context.getState([address])
	let stateData = decoder.decode(state[address])
	if (!stateData) {
	} else {
		let arrayData = JSON.parse(stateData)
		let newArraydata = arrayData.filter(img => img != data)
		const dataBytes = encoder.encode(JSON.stringify(newArraydata)),
			entries = {
				[address]: dataBytes
			}
		const Status = await context.setState(entries)
		context.addReceiptData(Buffer.from(Status, 'utf8'))
		return Status
	}
}

//transaction handler class

class FmsHandler extends TransactionHandler {
	constructor() {
		super(FAMILY_NAME, ['1.0'], [NAMESPACE])
	}
	//apply function
	apply(transactionProcessRequest, context) {
		try {
			const header = transactionProcessRequest.header,
				userPublicKey = header.signerPublicKey,
				PayloadBytes = decoder.decode(transactionProcessRequest.payload),
				Payload = JSON.parse(PayloadBytes),
				address = getAddress(userPublicKey)
			if (Payload[0] == 1) {
				return AddImage(context, address, Payload[1])
			}
			if (Payload[0] == 0) {
				return DeleteImage(context, address, Payload[1])
			}
		} catch (err) {
			// throw new InternalError(err)
		}
	}
}

module.exports = FmsHandler
