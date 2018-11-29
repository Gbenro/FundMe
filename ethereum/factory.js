import web3 from './web3'
import FundMeFactory from './build/FundMeFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(FundMeFactory.interface),
  '0x88E97cd618fA32f1dCb84Dba6fD477D7DC5d9a27'
)

export default instance
