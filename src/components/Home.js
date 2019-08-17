import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { db } from '../Firebase'
import { capitalize } from '../utils'

const Home = props => {
  const [locations, setLocations] = useState()

  useEffect(() => {
    db.collection('books').onSnapshot(
      res => {
        let locations = []
        res.forEach(doc => {
          let book = doc.data()
          book.id = doc.id
          locations.push(book)
        })
        setLocations(locations)
      },
      err => console.log(err)
    )
  }, [])

  return (
    <Body>
      <h1>How's the Water Project</h1>
      <Paragraph>
        After my first time reading<span> This is Water</span>, I knew I wanted
        to share it with others. I had spent some time talking about the book
        and recommending it as much as possible when I came up with the
        <i> How's the Water Project</i>. I started by purchasing five hardcover
        copies of the book, wrote a message on the inside of each, and created
        this website.
      </Paragraph>
      <br />
      <Paragraph>
        Those five books were given to friends with simple instructions. Read
        the book, share on the website, and give the book to someone else.
      </Paragraph>
      <LocBtnContainer>
        {locations
          ? locations.map(location => {
              const book = location.id
              return (
                <LocationBtn
                  key={book}
                  btncolor={location.color}
                  to={{ pathname: '/see', state: { book: capitalize(book) } }}
                >
                  {capitalize(book)}: {location.current}
                </LocationBtn>
              )
            })
          : null}
      </LocBtnContainer>
    </Body>
  )
}

export default Home

const Body = styled.div`
  align-items: center;
  color: #282c34;
  display: flex;
  flex-direction: column;
  margin-bottom: 65px
  padding: 15px;
  position: absolute;
  top: 0;
  max-width: 550px;
`
const Paragraph = styled.p`
  color: #282c34;
  font-size: 1em;
  margin: 0;
  span {
    font-weight: bold;
  }
  i {
    font-weight: 600;
  }
`
const LocBtnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  max-width: 550px;
  width: 100%;
`
const LocationBtn = styled(Link)`
  background: #e9e9e9;
  border: ${props => `5px solid ${props.btncolor}`};
  border-radius: 10px;
  box-shadow: 0 0 0 3px #282c34;
  color: #282c34;
  cursor: pointer;
  font-size: 0.8em;
  font-weight: 600;
  padding: 20px;
  margin-top: 20px;
  text-decoration: none;
  transition: 0.3s ease;
  width: 80%;
  :hover {
    background: ${props => props.btncolor};
    border: 5px solid white;
    color: white;
  }
  @media (max-width: 768px) {
    background: ${props => props.btncolor};
    border: 5px solid white;
    color: white;
    width: 100%;
  }
`
