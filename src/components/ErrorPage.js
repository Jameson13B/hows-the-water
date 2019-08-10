import React from './node_modules/react'
import styled from './node_modules/styled-components'
import { Link } from './node_modules/react-router-dom'

const ErrorPage = props => {
  return (
    <Body>
      <Cta>404</Cta>
      <Message>Oops, it looks like you have swam into bad water.</Message>
      <ButtonContainer>
        <BackButton onClick={() => props.history.goBack()}>Back</BackButton>
        <HomeLink to='/'>Home</HomeLink>
      </ButtonContainer>
    </Body>
  )
}

export default ErrorPage

const Body = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%
  margin-top: 12vh;
  max-width: 550px;
`
const Cta = styled.h1`
  color: black;
  font-size: 20em;
  line-height: 100%;
  margin: 15px 0 0;
`
const Message = styled.h1`
  color: black;
  margin-top: 15px;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`
const HomeLink = styled(Link)`
  background: #e9e9e9;
  border-radius: 10px;
  color: #282c34;
  cursor: pointer;
  font-size: 1.5em;
  padding: 10px;
  text-decoration: none;
  width: 30%;
  :hover {
    background: #1177e2;
  }
`
const BackButton = styled.button`
  background: #e9e9e9;
  border-radius: 10px;
  color: #282c34;
  cursor: pointer;
  font-size: 1.5em;
  padding: 10px;
  text-decoration: none;
  width: 30%;
  :hover {
    background: #1177e2;
  }
`
