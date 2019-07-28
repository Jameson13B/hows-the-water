import React from 'react'
import styled from 'styled-components'
import howsTheWater from '../images/hows_the_water.png'
import { Link } from 'react-router-dom'

const Home = props => {
  const affiliateLink = child => {
    return (
      <a href='/'>
        <b>{child}</b>
      </a>
    )
  }
  return (
    <Body>
      <Image src={howsTheWater} alt='hows the water comic' />
      <Paragraph>
        <b>About the Site -</b> After reading {affiliateLink('This is Water')}{' '}
        myself I knew I wanted to share it with others. Share how I felt, some
        of my thoughts, and the book itself. After spending time telling others
        about the book and recommending it as much as possible, I came up with
        the idea of How's the Water. I started by purchasing three hardcover
        copies of the book <em>This is Water</em> (<em>Book Alpha</em>,{' '}
        <em>Book Bravo</em>, and <em>Book Charlie</em>), wrote a message on the
        inside of each, and created this website.
      </Paragraph>
      <Paragraph>
        Those three books were given to friends with simple instructions. Read
        the book, share on the website, and give the book to someone else.
      </Paragraph>
      <Paragraph>
        This website accomplishes two tasks. It provides others the opportunity
        to share their thoughts, feelings, advice, etc. It also provides a forum
        of shared entries to inspire you, help you grow, and provide new
        insight.
      </Paragraph>
      <NavBtnContainter>
        <NavBtn to='/see'>See Others</NavBtn>
        <NavBtn to='/share'>Share Yours</NavBtn>
      </NavBtnContainter>
      <h3 style={{ margin: '16px 0' }}>Current Locations:</h3>
      <LocBtnContainer>
        <LocationBtn to={{ pathname: '/see', state: { book: 'Alpha' } }}>
          Alpha: New York, NY
        </LocationBtn>
        <LocationBtn to={{ pathname: '/see', state: { book: 'Bravo' } }}>
          Bravo: New York, NY
        </LocationBtn>
        <LocationBtn to={{ pathname: '/see', state: { book: 'Charlie' } }}>
          Charlie: New York, NY
        </LocationBtn>
      </LocBtnContainer>
      <Paragraph>
        <b>About the Book -</b> Only once did David Foster Wallace give a public
        talk on his views on life, during a commencement address given in 2005
        at Kenyon College. The speech is reprinted for the first time in book
        form in {affiliateLink('This is Water')}. How does one keep from going
        through their comfortable, prosperous adult life unconsciously? How do
        we get ourselves out of the foreground of our thoughts and achieve
        compassion? The speech captures Wallace’s electric intellect as well as
        his grace in attention to others. After his death, it became a treasured
        piece of writing reprinted in The Wall Street Journal and the London
        Times, commented on endlessly in blogs, and emailed from friend to
        friend. Writing with his one-of-a-kind blend of causal humor, exacting
        intellect, and practical philosophy, David Foster Wallace probes the
        challenges of daily living and offers advice that renews us with every
        reading.
      </Paragraph>
      <p>
        Made and Managed by{' '}
        <a
          href='https://www.jamesonb.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Jameson Brown
        </a>
      </p>
    </Body>
  )
}

export default Home

const Body = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%
  margin-top: 12vh;
  max-width: 550px;
`
const Image = styled.img`
  max-height: 250px;
  margin-top: 20px;
`
const Paragraph = styled.p`
  line-height: 1.6;
  margin-bottom: 0;
  :nth-of-type(3) {
    margin-bottom: 16px;
  }
`
const NavBtnContainter = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0;
  max-width: 275px;
  width: 100%;
`
const NavBtn = styled(Link)`
  background: #ee9a6f;
  border: 1px solid #282c34;
  border-radius: 10px;
  color: #282c34;
  cursor: pointer;
  font-weight: bold;
  padding: 10px;
  text-decoration: none;
  transition: 0.3s;
  :hover {
    background: #cd8662;
  }
`
const LocBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  max-width: 550px;
  width: 100%;
`
const LocationBtn = styled(Link)`
  background: #e9e9e9;
  border: 1px solid #282c34;
  border-radius: 10px;
  color: #282c34;
  cursor: pointer;
  padding: 10px;
  text-decoration: none;
  transition: 0.3s;
  :hover {
    background: lightgreen;
  }
`
