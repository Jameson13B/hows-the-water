import React from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import CallToAction from './components/CallToAction'
import Home from './components/Home'
import ErrorPage from './components/ErrorPage'
import See from './components/See'
import Share from './components/Share'
import NavBar from './components/NavBar'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visited: sessionStorage.htwVisited || false
    }
  }
  componentDidMount() {
    const cta = document.querySelector('#callToAction')
    const navBar = document.querySelector('#navBar')
    const body = document.querySelector('body')

    if (this.state.visited) {
      if (cta) cta.style.top = '-9999px'
      navBar.style.visibility = 'visible'
      navBar.style.bottom = '0'
      body.style.overflow = 'auto'
    } else {
      body.style.overflow = 'hidden'
    }
  }
  onEnterSiteClick = () => {
    this.setState({ visited: true })
    let cta = document.querySelector('#callToAction')
    let navBar = document.querySelector('#navBar')
    console.log(navBar)
    let body = document.querySelector('body')

    cta.style.top = '-9999px'
    navBar.style.visibility = 'visible'
    navBar.style.bottom = '0'
    body.style.overflow = 'auto'
  }
  render() {
    return (
      <AppContainer>
        {!this.state.visited ? (
          <CallToAction onEnterSiteClick={this.onEnterSiteClick} />
        ) : null}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/see' component={See} />
          <Route exact path='/share' component={Share} />
          <Route component={ErrorPage} />
        </Switch>
        <NavBar />
      </AppContainer>
    )
  }
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
// Create about book and about Jameson view
