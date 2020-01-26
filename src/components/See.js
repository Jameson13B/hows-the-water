import React, { Component } from 'react'
import styled from 'styled-components'
import { db } from '../Firebase'
import {
  capitalize,
  lowercase,
  filterByBook,
  formatDateString
} from '../utils/utils'

class See extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shares: [],
      colorChart: {
        arctic: '#1ab394',
        atlantic: '#f8ac59',
        indian: '#23c6c8',
        pacific: '#ed5565',
        southern: '#1c84c6'
      },
      book: this.props.location.state ? this.props.location.state.book : 'all'
    }
  }

  componentDidMount() {
    db.collection('shares').onSnapshot(res => {
      let shares = []
      res.forEach(doc => {
        let item = doc.data()
        item.id = doc.id
        item.date = item.date ? item.date.toDate() : null
        shares.push(item)
      })
      this.setState({ shares })
    })
  }

  render() {
    const { book, shares } = this.state

    return (
      <Body>
        <h1 style={{ marginBottom: 0 }}>See {capitalize(book) || 'All'}</h1>
        <SeeAllButton onClick={() => this.setState({ book: 'all' })}>
          See All
        </SeeAllButton>
        {shares
          // filter by book if a book is selected
          .filter(share => filterByBook(share, book))
          .sort((a, b) => b.date - a.date)
          .map(share => {
            return (
              <div key={share.id}>
                <Message>{share.message}</Message>
                <MessageInfo>
                  {/* If the share has a URL, return link, else return p */}
                  {share.url ? (
                    <Who>
                      <p>
                        <a
                          href={share.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <b>{share.name}</b>
                        </a>{' '}
                        - {share.location}
                      </p>
                    </Who>
                  ) : (
                    <Who>
                      <p>
                        <b>{share.name}</b> - {share.location}
                      </p>
                    </Who>
                  )}
                  <Book
                    onClick={() => {
                      this.setState({ book: share.book })
                    }}
                    btnColor={this.state.colorChart[lowercase(share.book)]}
                  >
                    {share.book}
                  </Book>
                  <Date>{formatDateString(share.date, 'MMMM Do YYYY')}</Date>
                </MessageInfo>
                <hr style={{ borderColor: '#282c34', width: '450px' }} />
              </div>
            )
          })}
      </Body>
    )
  }
}

export default See

const Body = styled.div`
  align-items: center;
  color: #282c34;
  display: flex;
  flex-direction: column;
  margin-bottom: 75px;
  max-width: 600px;
`
const SeeAllButton = styled.button`
  background: lightgray;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.55em;
  margin: 0;
`
const Message = styled.p`
  font-size: 0.9em;
  line-height: 1.5;
  margin-bottom: 0;
  padding: 0 15px;
  text-align: left;
`
const MessageInfo = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9em;
  justify-content: center;
  padding: 0 15px;
`
const Who = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: center;
  p {
    margin: 10px 0 5px 0;
  }
`
const Book = styled.p`
  background: ${props => props.btnColor}};
  border: ${props => `1px solid ${props.btnColor}`};
  border-radius: 15px;
  color: white;
  cursor: pointer;
  font-size: 0.7em;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 0;
  padding: 1px 5px;
`
const Date = styled.p`
  font-style: italic;
  font-size: 0.8em;
  justify-content: center;
  margin-bottom: 0;
  margin-left: 10px;
  margin-top: 0;
`
