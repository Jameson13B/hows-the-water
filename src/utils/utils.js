import React from 'react'
import ReactGA from 'react-ga'
import GoogleAnalytics from './GoogleAnalytics'
import { Route } from 'react-router-dom'
import moment from 'moment'

// Helper Functions
export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const lowercase = string =>
  string.charAt(0).toLowerCase() + string.slice(1)

export const filterByBook = (share, selectedBook) => {
  if (selectedBook === 'all') return true
  if (share.book === selectedBook) return true
}

export const formatDateString = (date, format) =>
  moment(date)
    .format(format)
    .toString()

export const personalSignature = () => {
  return (
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
  )
}

// Google Analytics Utils
const RouteTracker = () => <Route component={GoogleAnalytics} />

const init = () =>
  REACT_APP_GA_TRACKING_ID
    ? ReactGA.initialize(REACT_APP_GA_TRACKING_ID)
    : false

export const GAEvent = (category, action) => {
  ReactGA.event({
    category,
    action
  })
}

export default {
  GoogleAnalytics,
  RouteTracker,
  init
}
