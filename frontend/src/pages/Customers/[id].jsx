import { LegacyStack } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
import CustomerApi from '../../apis/customer'
import CreateForm from './CreateForm'

function DetailPage(props) {
  const { actions } = props

  let { id } = useParams()

  const [customer, setCustomer] = useState(null)

  const getCustomer = async () => {
    try {
      let res = await CustomerApi.findById(id)
      if (!res.success) throw res.error

      setCustomer(res.data)
    } catch (error) {
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getCustomer()
  }, [])

  return (
    <LegacyStack vertical alignment="fill">
      <Header
        title={customer?.fullName || 'loading...'}
        onBack={() => props.navigate('/customers')}
      />

      {customer && <CreateForm {...props} created={customer} />}
    </LegacyStack>
  )
}

export default DetailPage
