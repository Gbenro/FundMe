const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/FundMeFactory.json')

const provider = new HDWalletProvider(
  'tackle magnet buzz margin jewel tell liar wish kid ghost develop usual',
  'https://rinkeby.infura.io/TtUrxmqmedKiVhPY77Ve'
)
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '3000000', from: accounts[0] })

  console.log('Contract deployed to ', result.options.address)
}
deploy()
