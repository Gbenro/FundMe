import React, { Component } from 'react'
import factory from '../ethereum/factory'

class FundMeIndex extends Component {
  async componentDidMount () {
    const fundraiser = await factory.methods.getDeployedFundraisers().call()
    console.log(fundraiser)
  }

  render () {
    return <div>Fund Me</div>
  }
}

export default FundMeIndex
