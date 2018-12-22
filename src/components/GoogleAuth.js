import React, { Component } from 'react'

class GoogleAuth extends Component {
  state = {
    isSignedIn: null
  }
  componentDidMount () {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '625360752467-ccai5pl2okosknq0vm95jhe960c8fu9g.apps.googleusercontent.com',
          scope: 'profile'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance()
          this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        })
    })
  }
  renderAuthButton () {
    if (this.state.isSignedIn === null) {
      return <div> Not sure if signed in</div>
    } else if (this.state.isSignedIn) {
      return <div>I am signed in</div>
    } else {
      return <div>Not signed in</div>
    }
  }
  render () {
    return <div> {this.renderAuthButton()}</div>
  }
}

export default GoogleAuth
