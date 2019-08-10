import React, { Component } from 'react'
import styled from 'styled-components'
import { db } from '../Firebase'
import {
  capitalize,
  getTagColor,
  filterByBook,
  formatDateString
} from '../utils'

class See extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shares: [],
      book: 'all'
    }
  }
  componentDidMount() {
    const book = this.props.location.state
      ? this.props.location.state.book
      : 'all'
    db.collection('shares').onSnapshot(res => {
      let shares = []
      res.forEach(doc => {
        let item = doc.data()
        item.id = doc.id
        item.date = item.date ? item.date.toDate() : null
        shares.push(item)
      })
      this.setState({ shares, book: book })
    })
  }
  render() {
    const { book, shares } = this.state
    return (
      <Body>
        <h1>See {capitalize(book) || 'All'}</h1>
        {shares
          // filter by book if a book is selected
          .filter(share => filterByBook(share, book))
          .sort((a, b) => b.date - a.date)
          .map(share => {
            return (
              <div style={{ width: '100%' }} key={share.id}>
                <Message>{share.message}</Message>
                <MessageInfo>
                  {/* If the share has a URL, return link, else return p */}
                  {share.url ? (
                    <Who>
                      <a
                        href={share.url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <b>{share.name}</b>
                      </a>
                      <p> - {share.location}</p>
                    </Who>
                  ) : (
                    <Who>
                      <p>
                        <b>{share.name}</b> - {share.location}
                      </p>
                    </Who>
                  )}
                  <Book color={getTagColor(share.book)}>{share.book}</Book>
                  <Date>{formatDateString(share.date, 'MMMM Do YYYY')}</Date>
                </MessageInfo>
                <hr style={{ borderColor: '#282c34', width: '375px' }} />
              </div>
            )
          })}
      </Body>
    )
  }
}

export default See

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
  max-width: 500px;
`
const Message = styled.p`
  line-height: 1.5;
  margin-bottom: 0;
  padding: 0 15px;
  text-align: left;
`
const MessageInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
`
const Who = styled.div`
  align-items: center;
  display: flex;
`
const Book = styled.p`
  background: ${props => props.color}}
  border: ${props => `1px solid ${props.color}`}
  border-radius: 15px;
  color: white;
  font-size: .8em;
  font-weight: bold;
  padding: 1px 3px;
`
const Date = styled.p`
  font-style: italic;
`
