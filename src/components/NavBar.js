import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <Container id='navBar'>
      <NavItem to='/'>
        <i class='material-icons'>home</i>Home
      </NavItem>
      <NavItem to='/see'>
        <i class='material-icons'>all_inbox</i>See
      </NavItem>
      <NavItem to='/share'>
        <i class='material-icons'>create</i>Share
      </NavItem>
      <NavItem to='/about'>
        <i class='material-icons'>help_outline</i>About
      </NavItem>
    </Container>
  )
}

export default NavBar

const Container = styled.div`
  background: #282c34;
  bottom: -9999px;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  transition: bottom 0.5s ease;
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
