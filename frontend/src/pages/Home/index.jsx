import { LegacyStack } from '@shopify/polaris'
import React, { useEffect } from 'react'
import Header from '../../components/Header'

function IndexPage(props) {
  return (
    <LegacyStack vertical alignment="fill">
      <Header title="Home" />
    </LegacyStack>
  )
}

export default IndexPage
