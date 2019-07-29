import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { db } from '../Firebase'

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
  filterByBook = (share, book) => {
    if (book === 'all') return true
    if (share.book === book) return true
  }
  render() {
    const { book, shares } = this.state
    return (
      <Body>
        <h1>See {book.charAt(0).toUpperCase() + book.slice(1) || 'All'}</h1>
        {shares
          .filter(share => this.filterByBook(share, book))
          .sort((a, b) => b.date - a.date)
          .map(share => {
            const tagColor =
              share.book === 'Alpha'
                ? '#440077'
                : share.book === 'Bravo'
                ? '#b14bfa'
                : share.book === 'Charlie'
                ? '#24a302'
                : share.book === 'Delta'
                ? '#62e63e'
                : '#9f8909'
            return (
              <div style={{ width: '100%' }} key={share.id}>
                <Message>{share.message}</Message>
                <MessageInfo>
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
                  <Book color={tagColor}>{share.book}</Book>
                  <Date>
                    {moment(share.date)
                      .format('MMMM Do YYYY')
                      .toString()}
                  </Date>
                </MessageInfo>
                <hr style={{ borderColor: '#282c34', width: '400px' }} />
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
  text-align: left;
`
const MessageInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
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
