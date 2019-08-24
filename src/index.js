import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import GA from './utils/utils'

require('dotenv').config()

ReactDOM.render(
  <Router>
    {GA.init() && <GA.RouteTracker />}
    <App />
  </Router>,
  document.getElementById('root')
)
