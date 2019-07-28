import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      small: false
    }
    this.getWindowHeight = this.getWindowHeight.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.getWindowHeight)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.getWindowHeight)
  }
  getWindowHeight = () => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop

    distanceY >= '50'
      ? this.setState({ small: true })
      : this.setState({ small: false })
  }

  render() {
    return (
      <HeaderContainer small={this.state.small}>
        <Title to='/' small={this.state.small.toString()}>
          How's the Water?
        </Title>
      </HeaderContainer>
    )
  }
}

export default Header

const HeaderContainer = styled.header`
  align-items: center;
  background-color: #282c34;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 1.5em;
  justify-content: center;
  height: ${props => (props.small ? '8vh' : '12vh')};
  position: fixed;
  top: 0;
  width: 100%;
`
const Title = styled(Link)`
  color: white;
  font-size: ${props => (props.small ? '2em' : '2.5em')};
  text-decoration: none;
  :hover {
    font-weight: 600;
  }
`
