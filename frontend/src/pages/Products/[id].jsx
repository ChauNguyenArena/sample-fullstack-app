import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductApi from '../../apis/product'
import Header from '../../components/Header'
import { LegacyStack } from '@shopify/polaris'
import CreateForm from './CreateForm'

const DetailProduct = (props) => {
  const { actions } = props

  let { id } = useParams()

  const [product, setProduct] = useState(null)

  const getProducts = async () => {
    try {
      let res = await ProductApi.findById(id)
      if (!res.success) throw res.error

      setProduct(res.data)
    } catch (error) {
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <LegacyStack vertical alignment="fill">
      <Header title={product?.title || 'loading...'} onBack={() => props.navigate('/products')} />

      {product && <CreateForm {...props} created={product} />}
    </LegacyStack>
  )
}

export default DetailProduct
