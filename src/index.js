import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import ReactGA from 'react-ga'
ReactGA.initialize('UA-145443680-1')
ReactGA.pageview('/')
ReactGA.pageview('/see')
ReactGA.pageview('/share')
ReactGA.pageview('/about')

require('dotenv').config()

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
