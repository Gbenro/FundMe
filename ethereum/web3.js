import Web3 from 'web3'

let web3
// case when our code is running in the browser and metamask is available
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider)
} else {
  // we are on the server or user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/TtUrxmqmedKiVhPY77Ve'
  )
  web3 = new Web3(provider)
}
export default web3
// const web3 = new Web3(window.web3.currentProvider)
// export default web3
