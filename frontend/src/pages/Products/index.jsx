import React, { useEffect, useState } from 'react'
import qs from 'query-string'
import ProductApi from '../../apis/product'
import { useSearchParams } from 'react-router-dom'
import { LegacyStack } from '@shopify/polaris'
import Header from '../../components/Header'
import Table from './Table'

const IndexPage = (props) => {
  const { actions } = props

  const [searchParams, setSearchParams] = useSearchParams()

  const { page, limit, search } = qs.parse(props.location.search)

  const [products, setProducts] = useState(null)

  const getProducts = async ({ page = 1, limit = 10, search = '' }) => {
    try {
      let query = qs.stringify({ page, limit, search })
      let res = await ProductApi.find(query)
      if (!res.success) throw res.error
      setProducts(res.data)
      setSearchParams(query)
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getProducts({ page, limit, search })
  }, [])

  const handleDelete = async (deleted) => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.delete(deleted.id)
      if (!res.success) throw res.error

      actions.showNotify({ message: 'Deleted' })
      getProducts({ page, limit, search })
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
        title="Products"
        actions={[
          {
            label: 'Add new product',
            onClick: () => props.navigate('/products/new'),
            primary: true,
          },
        ]}
      />

      <Table
        {...props}
        data={products}
        onChangePage={(page) => getProducts({ page, limit, search })}
        onChangeLimit={(limit) => getProducts({ page: 1, limit, search })}
        search={search}
        onSearch={(search) => getProducts({ page: 1, limit, search })}
        onEdit={(item) => props.navigate(`products/${item.id}`)}
        onDelete={handleDelete}
      />
    </LegacyStack>
  )
}

export default IndexPage
