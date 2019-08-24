import React from 'react'
import styled from 'styled-components'
import { GAEvent } from '../utils/utils'

const About = props => {
  return (
    <Container>
      <h2>About the Project</h2>
      <Paragraph>
        The <i>How's the Water Project</i> started in August 2019 with the goal
        of sharing a powerful message and influencing others in the best way
        possible. Created by Jameson Brown and contributed to by amazing people
        around the world. Check back often for inspiration and keep living a
        compassionate life. For those that have recieved one of the books from
        this project, the instructions are simple.
        <ol>
          <li>Treat yourself and read the book</li>
          <li>Share your thoughts and feelings on the website</li>
          <li>Give the book to another awesome person</li>
        </ol>
      </Paragraph>
      <h2>About the Book</h2>
      <Paragraph>
        Only once did David Foster Wallace give a public talk on his views on
        life, during a commencement address given in 2005 at Kenyon College. The
        speech is reprinted for the first time in book form in{' '}
        <span> This is Water</span>. How does one keep from going through their
        comfortable, prosperous adult life unconsciously? How do we get
        ourselves out of the foreground of our thoughts and achieve compassion?
        The speech captures Wallace’s electric intellect as well as his grace in
        attention to others. After his death, it became a treasured piece of
        writing reprinted in The Wall Street Journal and the London Times,
        commented on endlessly in blogs, and emailed from friend to friend.
      </Paragraph>
      <h2>About Jameson</h2>
      <Paragraph>
        As a proud born and raised Utahn, Jameson has always had a passion for
        the outdoors, nature, and animals. Especially his black lab, Dexter.
        Jameson enjoys cooking, eating, and experiencing other cultures and
        cuisine. He loves being a front end engineer at MX, a fintech company,
        creating products that empower the world to be financially strong.
      </Paragraph>
      <a
        href='https://www.jamesonb.com'
        onClick={() => GAEvent('Link', 'Clicked Profile Link')}
        rel='noopener noreferrer'
        style={{ marginTop: 15 }}
        target='_blank'
      >
        More about Jameson
      </a>
    </Container>
  )
}

export default About

const Container = styled.div`
  align-items: center;
  color: #282c34;
  display: flex;
  flex-direction: column;
  margin-bottom: 90px
  max-width: 600px;
  padding: 15px;
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
  ol {
    font-weight: 600;
    margin: 15px auto 0;
    min-width: 400px;
    width: 65%;
  }
`
