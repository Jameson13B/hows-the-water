import React from 'react'
import styled from 'styled-components'
import { Link, Route, Switch } from 'react-router-dom'
import CallToAction from './components/CallToAction'
import Home from './components/Home'
import ErrorPage from './components/ErrorPage'
import See from './components/See'
import Share from './components/Share'

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
        <NavBar id='navBar'>
          <NavItem to='/'>
            <i class='material-icons'>home</i>Home
          </NavItem>
          <NavItem to='/see'>
            <i class='material-icons'>all_inbox</i>See
          </NavItem>
          <NavItem to='/share'>
            <i class='material-icons'>create</i>Share
          </NavItem>
          <NavItem to='/'>
            <i class='material-icons'>help_outline</i>About
          </NavItem>
        </NavBar>
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
const NavBar = styled.div`
  background: #282c34;
  bottom: -9999px;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  transition: bottom 1s ease;
  visibility: hidden;
  width: 100vw;
  z-index: 1;
`
const NavItem = styled(Link)`
  border: 3px solid white;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 0.75em;
  margin: 5px;
  padding: 5px 0;
  text-decoration: none;
  width: 10%;
  @media (max-width: 768px) {
    width: 20%;
  }
  i {
    font-size: 30px;
  }
`

// To do list:
// *Create about book and about Jameson view
