import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Button } from 'reactstrap'
import Layout from '../components/Layout'

class FundMeIndex extends Component {
  static async getInitialProps () {
    const fundraiser = await factory.methods.getDeployedFundraisers().call()

    return { fundraiser }
  }

  render () {
    return (
      <Layout>
        <div>
          <link
            rel='stylesheet'
            href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
            integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
            crossOrigin='anonymous'
          />
          Fund Me {this.props.fundraiser}
          <button className='btn btn-success'> Press Me</button>
        </div>
      </Layout>
    )
  }
}

export default FundMeIndex
