import React from 'react'
import Geosuggest from 'react-geosuggest'

const Geoselect = props => {
  const styles = {
    input: {
      width: '100%'
    },
    suggests: {
      background: 'white',
      border: '1px solid #282c34',
      borderRadius: '5px',
      margin: '0',
      padding: '0',
      position: 'absolute',
      width: '100%'
    },
    suggestItem: {
      listStyleType: 'none',
      padding: '0 15px'
    }
  }
  return (
    <Geosuggest
      style={styles}
      className='customGeoStyle'
      onSuggestSelect={props.onSuggestSelect}
      placeholder='Location - City, ST'
      types={['(cities)']}
    />
  )
}

export default Geoselect
