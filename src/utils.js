import React from 'react'
import moment from 'moment'

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
