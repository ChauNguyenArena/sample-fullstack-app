import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VendorApi from '../../apis/vendor'
import { LegacyStack } from '@shopify/polaris'
import Header from '../../components/Header'
import CreateForm from './CreateForm'

const DetailPage = (props) => {
  const { actions } = props

  let { id } = useParams()

  const [vendor, setVendor] = useState(null)

  const getVendor = async () => {
    try {
      let res = await VendorApi.findById(id)
      if (!res.success) throw res.error

      setVendor(res.data)
    } catch (error) {
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getVendor()
  }, [])
  return (
    <LegacyStack vertical alignment="fill">
      <Header title={vendor?.name || 'loading...'} onBack={() => props.navigate('/vendors')} />

      {vendor && <CreateForm {...props} created={vendor} />}
    </LegacyStack>
  )
}

export default DetailPage
