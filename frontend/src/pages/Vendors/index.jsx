import { LegacyStack } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import qs from 'query-string'
import VendorApi from '../../apis/vendor'
import Table from './Table'
// import Table from './Table'

const IndexPage = (props) => {
  const { action } = props

  const { page, limit, search } = qs.parse(props.location.search)

  const [vendors, setVendors] = useState(null)

  const getVendors = async ({ page = 1, limit = 10, search = '' }) => {
    try {
      let query = qs.stringify({ page, limit, search })
      let res = await VendorApi.find(query)
      if (!res.success) throw res.error
      setVendors(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getVendors({ page, limit, search })
  }, [])

  const handleDelete = async (deleted) => {
    try {
      actions.showAppLoading()

      let res = await VendorApi.delete(deleted.id)
      if (!res.success) throw res.error

      actions.showNotify({ message: 'Deleted' })

      getVendors({ page, limit, search })
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    }
  }

  return (
    <LegacyStack vertical alignment="fill">
      <Header
        title="Vendor"
        actions={[
          {
            label: 'Add new vendor',
            onClick: () => props.navigate('/vendor/new'),
            primary: true,
          },
        ]}
      />

      <Table
        {...props}
        data={vendors}
        onChangePage={(page) => getVendors({ page, limit, search })}
        onChangeLimit={(limit) => getVendors({ page: 1, limit, search })}
        search={search}
        onSearch={(search) => getVendors({ page: 1, limit, search })}
        onEdit={(item) => props.navigate(`countries/${item.id}`)}
        onDelete={handleDelete}
      />
    </LegacyStack>
  )
}

export default IndexPage
