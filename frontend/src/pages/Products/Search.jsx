import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@shopify/polaris'

const Search = (props) => {
  const { onChange } = props

  const [value, setValue] = useState(props.value)

  const handleSearch = (_value) => {
    setValue(_value)
    if (window.__searchTimeout) clearTimeout(window.__searchTimeout)
    window.__searchTimeout = window.setTimeout(() => onChange(_value), 500)
  }
  return (
    <TextField
      label="Search"
      placeholder="search"
      value={value}
      onChange={handleSearch}
      autoComplete="off"
      clearButton
      onClearButtonClick={() => handleSearch('')}
    />
  )
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

Search.defaultProps = {
  value: '',
  onChange: () => {},
}

export default Search
