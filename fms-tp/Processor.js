'use strict'
//works in strict mode
const { TransactionProcessor } = require('sawtooth-sdk/processor')
const FmsHandler = require('./FmsHandler')

if (process.argv.length < 3) {
	process.exit(1)
}

const address = process.argv[2]

const transactionProcessor = new TransactionProcessor(address)
transactionProcessor.addHandler(new FmsHandler())
transactionProcessor.start()
