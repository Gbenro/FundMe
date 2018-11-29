import 'bootstrap/dist/css/bootstrap.min.css'
// import $ from 'jquery'
// import Popper from 'popper.js'
// import 'bootstrap/dist/js/bootstrap.bundle.min'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import App from './components/app'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware()(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.querySelector('.container')
)
