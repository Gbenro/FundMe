import web3 from './web3'
import FundMe from './build/FundMe.json'

export default address => {
  return new web3.eth.Contract(JSON.parse(FundMe.interface), address)
}

// This gives us access to the FundMe contract in our Project
