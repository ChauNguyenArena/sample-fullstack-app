import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ValidateForm from '../../helpers/validateForm'
import ProductApi from '../../apis/product'
import { Button, Checkbox, Icon, LegacyCard, LegacyStack } from '@shopify/polaris'
import { CancelMajor } from '@shopify/polaris-icons'
import FormControl from '../../components/FormControl'
import generateSlug from '../../helpers/generateSlug'
import UploadApi from '../../apis/uploads'

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
  handle: {
    name: 'handle',
    type: 'text',
    label: 'Handle',
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
  thumbnail: {
    name: 'thumbnail',
    type: 'file',
    label: 'Thumbnail',
    value: null,
    originalValue: '',
    error: '',
    required: false,
    validate: {},
  },
  images: {
    name: 'images',
    type: 'file',
    label: 'Images',
    value: null,
    allowMultiple: true,
    originalValue: [],
    error: '',
    required: false,
    validate: {},
  },
}
function CreateForm(props) {
  const { actions, created, vendors } = props
  const [formData, setFormData] = useState(null)
  const [selected, setSelected] = useState([])

  useEffect(() => console.log('formData :>> ', formData), [formData])

  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(InitFormData))

    if (created.id) {
      Array.from(['title', 'description', 'handle', 'price']).forEach(
        (field) => (_formData[field] = { ..._formData[field], value: created[field] || '' })
      )
      Array.from(['publish']).forEach(
        (field) => (_formData[field] = { ..._formData[field], value: Boolean(created[field]) })
      )
      Array.from(['vendorId', 'status']).forEach(
        (field) => (_formData[field] = { ..._formData[field], value: String(created[field]) })
      )
      Array.from(['thumbnail', 'images']).forEach(
        (field) =>
          (_formData[field] = { ..._formData[field], originalValue: created[field] || null })
      )
    } else {
      // example data
      _formData['title'].value = 'Sample product'
      _formData['description'].value = 'Sample product, etc,...'
      _formData['handle'].value = 'sample-product'
      _formData['price'].value = 0
    }

    setFormData(_formData)
  }, [])

  const handleChange = async (name, value) => {
    // let _formData = JSON.parse(JSON.stringify(formData))
    let _formData = { ...formData }
    _formData[name] = { ..._formData[name], value, error: '' }

    if (name === 'title')
      _formData['handle'] = { ..._formData['handle'], value: generateSlug(value), error: '' }

    if (name === 'thumbnail' && value !== null) {
      let result = await UploadApi.uploadFiles([value])
      _formData['thumbnail'] = {
        ..._formData['thumbnail'],
        value: result.data[0],
        originalValue: result.data[0].url,
      }
    }

    if (name === 'images') {
      let result = await UploadApi.uploadFiles(value)
      let listImage = []
      result.data.forEach((image) => listImage.push(image.url))
      _formData['images'] = {
        ..._formData['images'],
        value: result.data,
        originalValue: _formData['images'].originalValue.concat(listImage),
      }
    }

    setFormData(_formData)
  }

  const handleRemove = () => {
    let _formData = { ...formData }

    _formData['thumbnail'].originalValue = null

    setFormData(_formData)
  }

  const handleRemoveInArray = (index) => {
    let _formData = { ...formData }

    _formData['images'].originalValue.splice(index, 1)

    setFormData(_formData)
  }

  const handleMultipleSelect = (index) => {
    let _filter = [...selected]
    _filter = !_filter.includes(index)
      ? [..._filter, index]
      : _filter.filter((item) => item !== index)

    setSelected(_filter)
  }

  const handleDelete = () => {
    console.log('delete')
    let _formData = { ...formData }
    // console.log(_formData['images'].originalValue)
    let forDeletion = []
    selected.forEach((index) => {
      forDeletion.push(_formData['images'].originalValue[index])
    })

    _formData['images'].originalValue = _formData['images'].originalValue.filter(
      (item) => !forDeletion.includes(item)
    )

    setFormData(_formData)
    setSelected([])
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
        handle: validFormData.handle.value,
        description: validFormData.description.value,
        price: validFormData.price.value,
        publish: validFormData.publish.value || undefined,
        status: validFormData.status.value || undefined,
        thumbnail: validFormData.thumbnail.originalValue,
        images: validFormData.images.originalValue,
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
              <FormControl
                {...formData['handle']}
                onChange={(value) => handleChange('handle', value)}
              />
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

          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['thumbnail']}
                onChange={(value) => handleChange('thumbnail', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill>
              {formData['thumbnail'].originalValue && (
                <div style={{ position: 'relative', marginTop: '24px', width: '120px' }}>
                  <div
                    style={{
                      position: 'absolute',
                      right: '13px',
                      top: '5px',
                      height: '10px',
                      width: '10px',
                    }}
                    onClick={handleRemove}
                  >
                    <Icon source={CancelMajor} color="critical" backdrop size />
                  </div>
                  <img
                    width="120px"
                    height="120px"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '10px',
                      border: 'dashed gray',
                      borderWidth: '1px',
                    }}
                    src={formData['thumbnail'].originalValue}
                  />
                </div>
              )}
            </LegacyStack.Item>
          </LegacyStack>

          <LegacyStack vertical distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['images']}
                onChange={(value) => handleChange('images', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '10px',
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'dashed gray',
                  borderWidth: '1px',
                }}
              >
                {formData['images'].originalValue.length > 0 ? (
                  formData['images'].originalValue.map((image, index) => (
                    <div
                      key={index}
                      style={{ position: 'relative', width: '60px', boxShadow: '1px 1px  #eeeeee' }}
                    >
                      <div
                        id={index}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '0px',
                          height: '10px',
                          width: '10px',
                        }}
                      >
                        <Checkbox
                          checked={selected.includes(index)}
                          onChange={() => handleMultipleSelect(index)}
                        />
                        {/* <Icon
                          source={CancelMajor}
                          color="critical"
                          backdrop
                          size
                          onClick={() => handleRemoveInArray(index)}
                        /> */}
                      </div>

                      <img
                        width="60"
                        height="60"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                        src={image}
                      />
                    </div>
                  ))
                ) : (
                  <p>Empty</p>
                )}
              </div>
            </LegacyStack.Item>
            {selected.length > 0 && (
              <LegacyStack.Item>
                <Button onClick={handleDelete}>Delete</Button>
              </LegacyStack.Item>
            )}
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
