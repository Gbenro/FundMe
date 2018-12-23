import React, { Component } from 'react'
import factory from '../ethereum/factory'

import Layout from '../src/components/Layout'

class FundMeIndex extends Component {
  static async getInitialProps () {
    const fundraiser = await factory.methods.getDeployedFundraisers().call()

    return { fundraiser }
  }

  render () {
    return (
      <Layout>
        <div className='container'>
          <h1> Welcome to Fundraising on the blockchain</h1>
          <h1 className='header'>Fund Me {this.props.fundraiser}</h1>
        </div>

        <style jsx>{`
          h1 {
            color: red;
          }
        `}</style>
      </Layout>
    )
  }
}

export default FundMeIndex
