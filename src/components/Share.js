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
  onSuggestSelect = suggest => this.setState({ location: suggest.label })
  validateForm = () => {
    const { book, message, name, location, url } = this.state
    const regex = new RegExp('^(https?://)+')
    if (!book || !message || !name || !location)
      return 'Name, location, book, and message required'
    if (book === 'Select your books name')
      if (!regex.test(url)) return 'URL must start with http:// or https://'
    return null
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
          <select
            name='book'
            onChange={this.handleInputChange}
            value={this.state.book}
          >
            <option value={null}>Select your books codename</option>
            <option value='pacific'>Pacific</option>
            <option value='atlantic'>Atlantic</option>
            <option value='indian'>Indian</option>
            <option value='artic'>Artic</option>
            <option value='southern'>Southern</option>
          </select>
          <textarea
            name='message'
            onChange={this.handleInputChange}
            placeholder='Enter your thoughts, feelings, advice, etc...'
            value={this.state.message}
          />
          {this.state.error ? <Error>{this.state.error}</Error> : null}
          <button>{this.state.buttonText}</button>
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
    font-size: .7em;
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
  select {
    appearance: none;
    background-color: #e9e9e9;
	  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
    border: 1px solid #282c34;
    border-radius: 10px;
    color: #282c34;
    font-size: .7em;
    margin: 20px 0 0;
    padding: 10px;
    transition: 0.3s
    width: 100%;
    :hover {
      background-color: #d5d5d5;
    }
    :focus {
      background-color: #d5d5d0;
    }
  }
  textarea {
    background: #e9e9e9;
    border: 1px solid #282c34;
    border-radius: 10px;
    color: #282c34;
    font-size: .7em;
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
  font-size: 0.75em;
  font-style: italic;
  font-weight: 700;
  margin: 20px 0 0 0;
`
