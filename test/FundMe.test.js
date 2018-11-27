const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../build/FundMeFactory.json')
const compiledFundMe = require('../build/FundMe.json')

// The list of accounts from ganache
let accounts
// The Instance FundMeFactory contract
let factory
// The fundMe contract address
let fundMeAddress
// The instance of a Fundme contract
let FundMe

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts()

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  await factory.methods
    .createFundMe(
      'Gbenro',
      'Adesoye',
      'I want to buy a car',
      web3.utils.toWei('1', 'ether')
    )
    .send({
      from: accounts[0],
      gas: '1000000'
    })
})

describe('Inbox', () => {})
