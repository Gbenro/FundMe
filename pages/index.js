import React, { Component } from 'react'
import factory from '../ethereum/factory'

import { Button } from 'reactstrap'

class FundMeIndex extends Component() {
  constructor (props) {
    super(props)
  }
  // static async getInitialProps () {
  //   console.log('here')
  //   const fundMe = await factory.methods.getDeployedFundraisers().call()

  //   return { fundMe }
  // }
  async componentDidMount () {
    const fundMe = await factory.methods.getDeployedFundraisers().call()
    console.log(fundMe)
  }

  render () {
    return <div>FundMe Index</div>
  }
}

export default FundMeIndex
