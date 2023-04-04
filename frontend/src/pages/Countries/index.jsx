import { LegacyStack } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import CountryApi from '../../apis/country'
import Header from '../../components/Header'
import Table from './Table'
import qs from 'query-string'
import { useSearchParams } from 'react-router-dom'

function IndexPage(props) {
  const { actions } = props

  const [searchParams, setSearchParams] = useSearchParams()

  const { page, limit, search } = qs.parse(props.location.search)

  const [countries, setCountries] = useState(null)

  const getCountries = async ({ page = 1, limit = 10, search = '' }) => {
    try {
      let query = qs.stringify({ page, limit, search })
      let res = await CountryApi.find(query)
      if (!res.success) throw res.error
      setCountries(res.data)
      setSearchParams(query)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getCountries({ page, limit, search })
  }, [])

  const handleDelete = async (deleted) => {
    try {
      actions.showAppLoading()

      let res = await CountryApi.delete(deleted.id)
      if (!res.success) throw res.error

      actions.showNotify({ message: 'Deleted' })

      getCountries({ page, limit, search })
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  return (
    <LegacyStack vertical alignment="fill">
      <Header
        title="Countries"
        actions={[
          {
            label: 'Add new country',
            onClick: () => props.navigate('/countries/new'),
            primary: true,
          },
        ]}
      />

      <Table
        {...props}
        data={countries}
        onChangePage={(page) => getCountries({ page, limit, search })}
        onChangeLimit={(limit) => getCountries({ page: 1, limit, search })}
        search={search}
        onSearch={(search) => getCountries({ page: 1, limit, search })}
        onEdit={(item) => props.navigate(`countries/${item.id}`)}
        onDelete={handleDelete}
      />
    </LegacyStack>
  )
}

export default IndexPage
