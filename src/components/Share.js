import React, { Component } from 'react'
import styled from 'styled-components'
import { db, Timestamp } from '../Firebase'

class Share extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      name: '',
      location: '',
      book: '',
      url: null,
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
      .add(share)
      .then(() => {
        this.setState({
          buttonText: 'Send',
          buttonColor: '#e9e9e9',
          error: null
        })
        this.props.history.push('/see')
      })
      .catch(error =>
        this.setState({
          error: error.message,
          buttonText: 'Send',
          buttonColor: '#e9e9e9'
        })
      )
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
        <h1>Thanks for Sharing</h1>
        <Form
          onSubmit={e => this.handleSendPost(e, share)}
          background={this.state.buttonColor}
        >
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
          <input
            name='name'
            onChange={this.handleInputChange}
            placeholder='Name'
            value={this.state.name}
          />
          <input
            name='location'
            onChange={this.handleInputChange}
            placeholder='Location - City, ST'
            value={this.state.location}
          />
          <input
            name='url'
            onChange={this.handleInputChange}
            placeholder='URL(optional) - Twitter, LinkedIn, Portfolio, Etc. *Inclued http://'
            value={this.state.url}
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
  display: flex;
  flex-direction: column;
  margin-top: 12vh;
  max-width: 500px;
  width: 100%;
`
const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
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
    border: 1px solid #282c34;
    border-radius: 10px;
    color: #282c34;
    cursor: pointer;
    font-size: 1em;
    margin: 20px 0 0;
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
