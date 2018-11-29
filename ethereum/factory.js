import web3 from './web3'
import FundMeFactory from './build/FundMeFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(FundMeFactory.interface),
  '0xb6710e2D9c16a3dDb68d0B21FD6B26E54a8e108A'
)

export default instance
