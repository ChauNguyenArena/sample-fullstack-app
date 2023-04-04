import { LegacyStack } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
import CountryApi from '../../apis/country'
import CreateForm from './CreateForm'

function DetailPage(props) {
  const { actions } = props

  let { id } = useParams()

  const [country, setCountry] = useState(null)

  const getCountry = async () => {
    try {
      let res = await CountryApi.findById(id)
      if (!res.success) throw res.error

      setCountry(res.data)
    } catch (error) {
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getCountry()
  }, [])

  return (
    <LegacyStack vertical alignment="fill">
      <Header title={country?.name || 'loading...'} onBack={() => props.navigate('/countries')} />

      {country && <CreateForm {...props} created={country} />}
    </LegacyStack>
  )
}

export default DetailPage
