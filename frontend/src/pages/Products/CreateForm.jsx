import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ValidateForm from '../../helpers/validateForm'
import ProductApi from '../../apis/product'
import { Button, LegacyCard, LegacyStack } from '@shopify/polaris'
import FormControl from '../../components/FormControl'

const InitFormData = {
  title: {
    name: 'title',
    type: 'text',
    label: 'Title',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      require: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
    focused: true,
  },
  // handle: {
  //   name: 'handle',
  //   type: 'text',
  //   label: 'Handle',
  //   value: '',
  //   error: '',
  //   require: true,
  //   validate: {
  //     trim: true,
  //     require: [true, 'Required!'],
  //     minlength: [2, 'Too short!'],
  //     maxlength: [200, 'Too long!'],
  //   },
  //   focused: true,
  // },
  description: {
    name: 'title',
    type: 'text',
    label: 'Description',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      require: [true, 'Required!'],
      minlength: [2, 'Too short!'],
    },
    focused: true,
  },
  price: {
    name: 'price',
    type: 'text',
    label: 'Price',
    value: 1,
    error: '',
    required: false,
    required: false,
  },
  publish: {
    name: 'publish',
    type: 'radio',
    label: 'Publish',
    value: '',
    error: '',
    required: false,
    validate: {},
    options: [
      { label: 'Publish', value: true },
      { label: 'Hide', value: false },
    ],
  },
  status: {
    name: 'status',
    type: 'select',
    label: 'Status',
    value: '',
    error: '',
    required: false,
    validate: {},
    options: [],
  },
  vendorId: {
    name: 'vendorId',
    type: 'select',
    label: 'Vendor',
    value: '',
    error: '',
    required: false,
    validate: {},
    options: [],
  },
}
function CreateForm(props) {
  const { actions, created, vendors } = props
  const [formData, setFormData] = useState(null)

  useEffect(() => console.log('formData :>> ', formData), [formData])

  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(InitFormData))

    if (created.id) {
      Array.from(['title', 'description', 'price']).forEach(
        (field) => (_formData[field] = { ..._formData[field], value: created[field] || '' })
      )
      Array.from(['publish']).forEach(
        (field) => (_formData[field] = { ..._formData[field], value: Boolean(created[field]) })
      )
      Array.from(['vendorId']).forEach(
        (field) => (_formData[field] = { ..._formData[field], value: String(created[field]) })
      )
      Array.from(['status']).forEach(
        (field) => (_formData[field] = { ..._formData[field], value: String(created[field]) })
      )
    } else {
      // example data
      _formData['title'].value = 'Sample product'
      _formData['description'].value = 'Sample product, etc,...'
      // _formData['handle'].value = 'sample-product'
      _formData['price'].value = 0
    }

    setFormData(_formData)
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    _formData[name] = { ..._formData[name], value, error: '' }
    setFormData(_formData)
  }

  const handleDiscard = () => props.navigate('products')

  const handleSubmit = async () => {
    try {
      const { formValid, validFormData } = ValidateForm.validateForm(formData)
      if (!formValid) {
        setFormData(validFormData)
        throw new Error('Invalid form data')
      }

      actions.showAppLoading()

      let data = {
        title: validFormData.title.value,
        // handle: validFormData.handle.value,
        description: validFormData.description.value,
        price: validFormData.price.value,
        publish: validFormData.publish.value || undefined,
        status: validFormData.status.value || undefined,
        vendorId: validFormData.vendorId.value || undefined,
      }
      console.log('data :>> ', data)

      let res = null
      if (created.id) {
        // update
        res = await ProductApi.update(created.id, data)
      } else {
        // create
        res = await ProductApi.create(data)
      }
      if (!res.success) throw res.error

      actions.showNotify({ message: created.id ? 'Saved' : 'Created' })
      console.log(res.data.id)
      props.navigate(`products/${res.data.id}`)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  if (!formData) return null

  let statusOptions = [
    { label: 'Select a vendor', value: '' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Archived', value: 'ARCHIVED' },
  ]

  let vendorOptions = vendors.map((item) => ({ label: item.name, value: '' + item.id }))
  vendorOptions.unshift({ label: 'Select a vendor', value: null })
  return (
    <LegacyStack vertical alignment="fill">
      <LegacyCard sectioned>
        <LegacyStack vertical alignment="fill" spacing="extraLoose">
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['title']}
                onChange={(value) => handleChange('title', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill>
              {/* <FormControl
                {...formData['handle']}
                onChange={(value) => handleChange('handle', value)}
              /> */}
            </LegacyStack.Item>
          </LegacyStack>

          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['description']}
                onChange={(value) => handleChange('description', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill>
              <FormControl
                {...formData['price']}
                onChange={(value) => handleChange('price', value)}
              />
            </LegacyStack.Item>
          </LegacyStack>

          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['publish']}
                onChange={(value) => handleChange('publish', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill></LegacyStack.Item>
          </LegacyStack>

          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['vendorId']}
                onChange={(value) => handleChange('vendorId', value)}
                options={vendorOptions}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill>
              <FormControl
                {...formData['status']}
                onChange={(value) => handleChange('status', value)}
                options={statusOptions}
              />
            </LegacyStack.Item>
          </LegacyStack>
        </LegacyStack>
      </LegacyCard>

      <LegacyStack distribution="trailing">
        <Button onClick={handleDiscard}>Discard</Button>
        <Button primary onClick={handleSubmit}>
          {created.id ? 'Save' : 'Add'}
        </Button>
      </LegacyStack>
    </LegacyStack>
  )
}

CreateForm.propTypes = {
  created: PropTypes.object,
}

CreateForm.defaultProps = {
  created: {},
}

export default CreateForm
