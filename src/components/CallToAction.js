import React from 'react'
import styled from 'styled-components'
import howsTheWater from '../images/hows_the_water.png'

const CallToAction = props => {
  const { onEnterSiteClick } = props

  return (
    <Body id='callToAction'>
      <Image src={howsTheWater} alt='hows the water comic' />
      <Title>How's the Water?</Title>
      <Icon onClick={onEnterSiteClick} className='material-icons'>
        arrow_downward
      </Icon>
    </Body>
  )
}

export default CallToAction

const Body = styled.div`
  align-items: center;
  background: #1177e2;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-evenly;
  position: absolute;
  top: 0;
  transition: top 1s ease;
  width: 100vw;
  z-index: 1;
`
const Image = styled.img`
  max-height: 350px;
  margin-top: 20px;
  @media (max-width: 768px) {
    max-height: 250px;
  }
`
const Title = styled.h1`
  font-size: 5em;
  text-shadow: -4px 3px 0 #1177e2, -14px 7px 0 #0a0e27;
  @media (max-width: 768px) {
    font-size: 3em;
  }
`
const Icon = styled.i`
  cursor: pointer;
  font-size: 4em;
  :hover {
    color: #0a0e27;
  }
`
