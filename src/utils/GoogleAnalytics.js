import React from 'react'
import ReactGA from 'react-ga'

class GoogleAnalytics extends React.Component {
  componentDidMount() {
    this.logPageChange(this.props.location.pathname, this.props.location.search)
  }

  componentDidUpdate({ location: prevLocation }) {
    const {
      location: { pathname, search }
    } = this.props
    const isDifferentPathname = pathname !== prevLocation.pathname
    const isDifferentSearch = search !== prevLocation.search

    if (isDifferentPathname || isDifferentSearch) {
      this.logPageChange(pathname, search)
    }
  }

  logPageChange(pathname, search = '') {
    const page = pathname + search
    const { location } = window
    ReactGA.set({
      page,
      location: `${location.origin}${page}`,
      ...this.props.options
    })
    ReactGA.pageview(page)
  }

  render() {
    return null
  }
}

export default GoogleAnalytics
