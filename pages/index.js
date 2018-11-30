import React, { Component } from 'react'
import factory from '../ethereum/factory'
// import { Button } from 'reactstrap'
import Layout from '../src/components/Layout'

class FundMeIndex extends Component {
  static async getInitialProps () {
    const fundraiser = await factory.methods.getDeployedFundraisers().call()

    return { fundraiser }
  }

  render () {
    return (
      <Layout>
        <div>
          <h1 className='header'>Fund Me {this.props.fundraiser}</h1>
        </div>
      </Layout>
    )
  }
}

export default FundMeIndex
