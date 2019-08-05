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
  background-color: transparent;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 1.5em;
  position: fixed;
  top: 0;
  width: 100%;
`
const Title = styled(Link)`
  background: ${props =>
    props.small === 'true'
      ? 'linear-gradient(270deg, #9fddff, #10abff)'
      : 'transparent'};
  background-size: 400% 400%;
  border-radius: 15px;
  color: #282c34;
  font-size: ${props => (props.small === 'true' ? '24px' : '72px')};
  margin: ${props => (props.small === 'true' ? '5px auto' : '20px auto')};
  padding: 15px;
  text-decoration: none;
  -webkit-animation: AnimationName 17s ease infinite;
  -moz-animation: AnimationName 17s ease infinite;
  animation: AnimationName 17s ease infinite;
  :hover {
    font-weight: 600;
  }
  @media (max-width: 768px) {
    font-size: ${props => (props.small === 'true' ? '24px' : '45px')};
  }
  @media (max-width: 400px) {
    font-size: ${props => (props.small === 'true' ? '24px' : '36px')};
  }
`
