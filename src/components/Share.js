import React, { Component } from 'react'
import styled from 'styled-components'
import { db, Timestamp } from '../Firebase'
import { lowercase } from '../utils'
import Geoselect from './Geoselect'

class Share extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      name: '',
      location: '',
      book: '',
      url: '',
      error: null,
      buttonText: 'Send',
      buttonColor: '#e9e9e9'
    }
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
  validateForm = () => {
    const { book, message, name, location } = this.state
    return !book || !message || !name || !location
      ? 'Book, message, name, and location required'
      : null
  }
  handleSendPost = (e, share) => {
    e.preventDefault()
    const error = this.validateForm()
    if (error) return this.setState({ error })
    this.setState({ buttonText: 'Sending...', buttonColor: 'lightgreen' })
    db.collection('shares')
      // Add new share
      .add(share)
      .then(() => {
        this.setState({
          buttonText: 'Send',
          buttonColor: '#e9e9e9',
          error: null
        })
        // Update books current location and history
        const bookRef = db.collection('books').doc(lowercase(share.book))
        return db
          .runTransaction(transaction => {
            return transaction.get(bookRef).then(doc => {
              const history = doc.data().history
              history.push(share.location)
              transaction.update(bookRef, { history, current: share.location })
            })
          })
          .catch(err => console.log(err))
      })
      .catch(error =>
        this.setState({
          error: error.message,
          buttonText: 'Send',
          buttonColor: '#e9e9e9'
        })
      )
    this.props.history.push('/see')
  }
  onSuggestSelect = suggest => this.setState({ location: suggest.label })

  render() {
    let share = {
      message: this.state.message,
      name: this.state.name,
      location: this.state.location,
      url: this.state.url,
      book: this.state.book,
      date: Timestamp.fromDate(new Date())
    }
    return (
      <Body>
        <h1 style={{ marginBottom: 15 }}>Thanks for Sharing</h1>
        <Form
          onSubmit={e => this.handleSendPost(e, share)}
          background={this.state.buttonColor}
          autoComplete='off'
        >
          <input
            name='name'
            onChange={this.handleInputChange}
            placeholder='Name'
            value={this.state.name}
          />
          <Geoselect onSuggestSelect={this.onSuggestSelect} />
          <input
            name='url'
            onChange={this.handleInputChange}
            placeholder='URL - Twitter, LinkedIn, Portfolio, Etc.'
            value={this.state.url}
          />
          <p style={{ fontSize: '14px', marginBottom: 0 }}>
            *URL is optional. Will be linked to your name on your share.
          </p>
          <input
            name='book'
            onChange={this.handleInputChange}
            placeholder='Book - Alpha, Bravo, Charlie, Delta, Echo'
            value={this.state.book}
          />
          <textarea
            name='message'
            onChange={this.handleInputChange}
            placeholder='Enter your thoughts, feelings, advice, etc...'
            value={this.state.message}
          />
          <button>{this.state.buttonText}</button>
          {this.state.error ? <Error>{this.state.error}</Error> : null}
        </Form>
      </Body>
    )
  }
}

export default Share

const Body = styled.div`
  align-items: center;
  color: #282c34;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
`
const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  width: 100%;
  input {
    background: #e9e9e9;
    border: 1px solid #282c34;
    border-radius: 10px;
    color: #282c34;
    font-size: 1em;
    margin: 20px 0 0;
    padding: 10px;
    transition: 0.3s
    width: 100%;
    :hover {
      background: #d5d5d5;
    }
    :focus {
      background: #d5d5d0;
    }
  }
  textarea {
    background: #e9e9e9;
    border: 1px solid #282c34;
    border-radius: 10px;
    color: #282c34;
    font-size: 1em;
    height: 20em;
    margin: 20px 0 0;
    padding: 10px;
    resize: none;
    transition: 0.3s;
    width: 100%;
    :hover {
      background: #d5d5d5;
    }
    :focus {
      background: #d5d5d5;
    }
  }
  button {
    background: ${props => props.background};
    border: 5px solid white;
    border-radius: 10px;
    box-shadow: 0 0 0 3px #282c34;
    color: #282c34;
    cursor: pointer;
    font-size: 1em;
    margin: 20px 0;
    padding: 10px;
    transition: 0.3s;
    width: 45%;
    :hover {
      background: lightgreen;
    }
  }
`
const Error = styled.p`
  color: red;
  font-weight: 700;
  font-style: italic;
`
