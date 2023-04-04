import { LegacyStack } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import CustomerApi from '../../apis/customer'
import Header from '../../components/Header'
import Table from './Table'
import qs from 'query-string'
import { useSearchParams } from 'react-router-dom'
import CountryApi from '../../apis/country'

function IndexPage(props) {
  const { actions } = props

  const [searchParams, setSearchParams] = useSearchParams()

  const { page, limit, search } = qs.parse(props.location.search)

  const [customers, setCustomers] = useState(null)
  const [countries, setCountries] = useState([])

  const getCustomers = async ({ page = 1, limit = 10, search = '' }) => {
    try {
      let query = qs.stringify({ page, limit, search })
      let res = await CustomerApi.find(query)
      if (!res.success) throw res.error
      setCustomers(res.data)
      setSearchParams(query)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    }
  }

  const getCountries = async () => {
    try {
      let res = await CountryApi.getAll()
      if (!res.success) throw res.error
      setCountries(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getCustomers({ page, limit, search })
    getCountries()
  }, [])

  const handleDelete = async (deleted) => {
    try {
      actions.showAppLoading()

      let res = await CustomerApi.delete(deleted.id)
      if (!res.success) throw res.error

      actions.showNotify({ message: 'Deleted' })

      getCustomers({ page, limit, search })
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
        title="Customers"
        actions={[
          {
            label: 'Add new customer',
            onClick: () => props.navigate('/customers/new'),
            primary: true,
          },
        ]}
      />

      <Table
        {...props}
        data={customers}
        countries={countries}
        onChangePage={(page) => getCustomers({ page, limit, search })}
        onChangeLimit={(limit) => getCustomers({ page: 1, limit, search })}
        search={search}
        onSearch={(search) => getCustomers({ page: 1, limit, search })}
        onEdit={(item) => props.navigate(`customers/${item.id}`)}
        onDelete={handleDelete}
      />
    </LegacyStack>
  )
}

export default IndexPage
