import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import CallToAction from './components/CallToAction'
import Home from './components/Home'
import ErrorPage from './components/ErrorPage'
// import See from './Components/See'
// import Share from './Components/Share'

const App = () => {
  useEffect(() => {
    const body = document.querySelector('body')

    body.style.overflow = !sessionStorage.htwVisited ? 'hidden' : 'auto'
  }, [])

  const onEnterSiteClick = () => {
    const cta = document.querySelector('#callToAction')
    const body = document.querySelector('body')

    cta.style.top = '-100%'
    body.style.overflow = 'auto'
    sessionStorage.htwVisited = !sessionStorage.htwVisited
  }

  return (
    <AppContainer>
      {!sessionStorage.htwVisited ? (
        <CallToAction onEnterSiteClick={onEnterSiteClick} />
      ) : null}
      <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route exact path='/see' component={See} /> */}
        {/* <Route exact path='/share' component={Share} /> */}
        <Route component={ErrorPage} />
      </Switch>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1.25em;
`

// To do list:
// Refactor See and Share Views
// Create format validation on form:
// Books: capitalize and one of three books
// Location: format
// URL: starts with http://
