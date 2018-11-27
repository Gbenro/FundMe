const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../build/FundMeFactory.json')
const compiledFundMe = require('../build/FundMe.json')

// The list of accounts from ganache
let accounts
// The Instance of a FundMeFactory contract
let factory
// The fundMe contract address
let fundMeAddress
// The instance of a Fundme contract
let fundMe

beforeEach(async () => {
  // get a list of all accounts from web3
  accounts = await web3.eth.getAccounts()
  // deploying the Fundme factory contract to the blockcahin
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '3000000' })

  // calling the createFundMe method in fundMeFactory to create a new FundMe contract
  await factory.methods
    .createFundMe(
      'Gbenro',
      'Adesoye',
      'I want to buy a car',
      web3.utils.toWei('1', 'ether')
    )
    .send({
      from: accounts[0],
      gas: '3000000'
    })

  // getting the address of the created fundme contract
  ;[fundMeAddress] = await factory.methods.getDeployedFundraisers().call()

  // Accessing the newly created contract with the address
  fundMe = await new web3.eth.Contract(
    JSON.parse(compiledFundMe.interface),
    fundMeAddress
  )
})

describe('Inbox', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address)
    assert.ok(fundMe.options.address)
  })

  it('marks caller as the fundMe recipient', async () => {
    const recipient = await fundMe.methods.recipient().call()
    assert.equal(accounts[0], recipient)
  })

  it('allows people to donate money and checks if they donated', async () => {
    // donating to the fundraiser
    await fundMe.methods.donate().send({
      value: web3.utils.toWei('.5', 'ether'),
      from: accounts[1],
      gas: 3000000
    })

    const amount = await fundMe.methods.donorsAmount(accounts[1]).call() // gets the amount donated
    console.log(amount)
    assert(amount > 0) // checks if the amount donated is greater than 0
  })

  it('allows recipient to withdraw money from contract', async () => {
    // donating to the fundraiser
    await fundMe.methods.donate().send({
      value: web3.utils.toWei('.5', 'ether'),
      from: accounts[1],
      gas: 3000000
    })

    // recipient withdraws money from the contract
    await fundMe.methods.withdraw().send({
      from: accounts[0],
      gas: 3000000
    })

    // gets the balance of the contract
    // check if balance is 0
    let balance = await web3.eth.getBalance(fundMeAddress)
    console.log(balance)
    assert(balance == 0)
  })

  it('allows recipient to end fundraiser', async () => {
    // recipient can end the fundraiser anytime
    await fundMe.methods.end().send({
      from: accounts[0],
      gas: 3000000
    })
    let isLive = await fundMe.methods.ongoing().call()
    // check fundraiser status
    assert(!isLive)
  })

  it('allows fundraiser to end after reaching Goal', async () => {
    await fundMe.methods.donate().send({
      value: web3.utils.toWei('1', 'ether'),
      from: accounts[1],
      gas: 3000000
    })
    let isLive = await fundMe.methods.ongoing().call()
    // check fundraiser status
    assert(!isLive)
  })

  it('does not allow anyone else to withdraw', async () => {
    // donating to the fundraiser
    await fundMe.methods.donate().send({
      value: web3.utils.toWei('.5', 'ether'),
      from: accounts[1],
      gas: 3000000
    })
    try {
      // recipient withdraws money from the contract
      await fundMe.methods.withdraw().send({
        from: accounts[2],
        gas: 3000000
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })
})
