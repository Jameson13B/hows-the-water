import React from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import See from './components/See'
import Share from './components/Share'
import ErrorPage from './components/ErrorPage'

function App() {
  return (
    <AppContainer>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/see' component={See} />
        <Route exact path='/share' component={Share} />
        <Route component={ErrorPage} />
      </Switch>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1em;
`

// To do list:
// Create format validation on form:
// Books: capitalize and one of three books
// Location: format
// URL: starts with http://
