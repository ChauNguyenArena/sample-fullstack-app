import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import VendorApi from '../../apis/vendor.js'
import ValidateForm from '../../helpers/validateForm'
import { Button, LegacyCard, LegacyStack } from '@shopify/polaris'
import FormControl from '../../components/FormControl'

CreateForm.propTypes = {
  created: PropTypes.object,
}

CreateForm.defaultProps = {
  create: {},
}

const InitFormData = {
  name: {
    name: 'name',
    type: 'text',
    label: 'Name',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
    focused: true,
  },
}

function CreateForm(props) {
  const { actions, created } = props
  const [formData, setFormData] = useState(null)
  useEffect(() => console.log('formData :>> ', formData), [formData])

  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(InitFormData))

    if (created.id) {
      Array.from(['name']).forEach(
        (field) => (_formData[field] = { ..._formData[field], value: created[field] || '' })
      )
    }

    setFormData(_formData)
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    _formData[name] = { ..._formData[name], value, error: '' }
    setFormData(_formData)
  }

  const handleDiscard = () => props.navigate('vendors')

  const handleSubmit = async () => {
    try {
      const { formValid, validFormData } = ValidateForm.validateForm(formData)
      if (!formValid) {
        setFormData(validFormData)
        throw new Error('Invalid form data')
      }

      actions.showAppLoading()

      let data = { name: validFormData.name.value }

      console.log('data :>> ', data)

      let res = null
      if (created.id) {
        res = await VendorApi.update(created.id, data)
      } else {
        res = await VendorApi.create(data)
      }

      if (!res.success) throw res.error
      actions.getVendors()

      actions.showNotify({ message: created.id ? 'Saved' : 'Created' })

      // props.navigate(`vendors/${res.data.id}`)
      props.navigate(`vendors`)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  if (!formData) return null
  return (
    <LegacyStack vertical alignment="fill">
      <LegacyCard sectioned>
        <LegacyStack vertical alignment="fill" spacing="extraLoose">
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['name']}
                onChange={(value) => handleChange('name', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill></LegacyStack.Item>
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

export default CreateForm
