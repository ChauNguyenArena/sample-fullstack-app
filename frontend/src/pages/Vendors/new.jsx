import { LegacyStack } from '@shopify/polaris'
import React from 'react'
import Header from '../../components/Header'
import CreateForm from './CreateForm'

const NewPage = (props) => {
  return (
    <LegacyStack vertical alignment="fill">
      <Header title="Add new Vendor" onBack={() => props.navigate('vendors')} />

      <CreateForm {...props} created={{}} />
    </LegacyStack>
  )
}

export default NewPage
