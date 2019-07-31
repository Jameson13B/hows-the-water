import React from 'react'
import moment from 'moment'

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const getTagColor = book =>
  book === 'Alpha'
    ? '#440077'
    : book === 'Bravo'
    ? '#b14bfa'
    : book === 'Charlie'
    ? '#24a302'
    : book === 'Delta'
    ? '#62e63e'
    : '#9f8909'

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
