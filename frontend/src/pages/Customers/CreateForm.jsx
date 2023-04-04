import PropTypes from 'prop-types'
import { Button, LegacyCard, LegacyStack } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import ValidateForm from '../../helpers/validateForm'
import FormControl from '../../components/FormControl'
import CustomerApi from '../../apis/customer'

CreateForm.propTypes = {
  // ...appProps,
  created: PropTypes.object,
}

CreateForm.defaultProps = {
  created: {},
}

const InitFormData = {
  firstName: {
    name: 'firstName',
    type: 'text',
    label: 'First name',
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
  lastName: {
    name: 'lastName',
    type: 'text',
    label: 'Last name',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
  },
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
  },
  username: {
    name: 'username',
    type: 'text',
    label: 'Username',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
  },
  phone: {
    name: 'phone',
    type: 'tel',
    label: 'Phone',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
  },
  gender: {
    name: 'gender',
    type: 'radio',
    label: 'Gender',
    value: '',
    error: '',
    required: false,
    validate: {},
    options: [
      { label: 'Male', value: true },
      { label: 'Female', value: false },
    ],
  },
  birthday: {
    name: 'birthday',
    type: 'date',
    label: 'Birthday',
    value: '',
    error: '',
    required: false,
    validate: {},
  },
  countryId: {
    name: 'countryId',
    type: 'select',
    label: 'Country',
    value: '',
    error: '',
    required: false,
    validate: {},
    options: [],
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'Password',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
  },
  passwordConfirm: {
    name: 'passwordConfirm',
    type: 'password',
    label: 'Password confirm',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long!'],
    },
  },
}

function CreateForm(props) {
  const { actions, created, countries } = props

  const [formData, setFormData] = useState(null)

  useEffect(() => console.log('formData :>> ', formData), [formData])

  useEffect(() => {
    let _formData = JSON.parse(JSON.stringify(InitFormData))

    if (created.id) {
      Array.from(['firstName', 'lastName', 'email', 'username', 'phone', 'birthday']).forEach(
        (field) => (_formData[field] = { ..._formData[field], value: created[field] || '' })
      )
      Array.from(['gender']).forEach(
        (field) => (_formData[field] = { ..._formData[field], value: Boolean(created[field]) })
      )
      Array.from(['countryId']).forEach(
        (field) => (_formData[field] = { ..._formData[field], value: String(created[field]) })
      )

      _formData['password'].disabled = true
      _formData['passwordConfirm'].disabled = true
    } else {
      // example data
      _formData['firstName'].value = 'David'
      _formData['lastName'].value = 'Pham'
      _formData['email'].value = `davidpham.${Date.now()}@gmail.com`
      _formData['username'].value = `davidpham.${Date.now()}`
      _formData['phone'].value = `(+84) ${Date.now()}`
      _formData['password'].value = '12345678'
      _formData['passwordConfirm'].value = '12345678'
    }

    setFormData(_formData)
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    _formData[name] = { ..._formData[name], value, error: '' }
    setFormData(_formData)
  }

  const handleDiscard = () => props.navigate('customers')

  const handleSubmit = async () => {
    try {
      // validate password and passwordConfirm
      if (
        formData.password.value &&
        formData.passwordConfirm.value &&
        formData.password.value !== formData.passwordConfirm.value
      ) {
        let error = 'Password and Password confirm do not match'
        setFormData({
          ...formData,
          password: { ...formData.password, error },
          passwordConfirm: { ...formData.passwordConfirm, error },
        })
        throw new Error(error)
      }

      const { formValid, validFormData } = ValidateForm.validateForm(formData)
      if (!formValid) {
        setFormData(validFormData)
        throw new Error('Invalid form data')
      }

      actions.showAppLoading()

      let data = {
        firstName: validFormData.firstName.value,
        lastName: validFormData.lastName.value,
        email: validFormData.email.value,
        username: validFormData.username.value,
        phone: validFormData.phone.value,
        gender: validFormData.gender.value || undefined,
        birthday: validFormData.birthday.value || undefined,
        password: validFormData.password.value || undefined,
        countryId: validFormData.countryId.value || undefined,
      }
      console.log('data :>> ', data)

      let res = null
      if (created.id) {
        // update
        res = await CustomerApi.update(created.id, data)
      } else {
        // create
        res = await CustomerApi.create(data)
      }
      if (!res.success) throw res.error

      actions.showNotify({ message: created.id ? 'Saved' : 'Created' })

      props.navigate(`customers/${res.data.id}`)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  if (!formData) return null

  let countryOptions = countries.map((item) => ({ label: item.name, value: '' + item.id }))
  countryOptions.unshift({ label: 'Select a country', value: '' })

  return (
    <LegacyStack vertical alignment="fill">
      <LegacyCard sectioned>
        <LegacyStack vertical alignment="fill" spacing="extraLoose">
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['firstName']}
                onChange={(value) => handleChange('firstName', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill>
              <FormControl
                {...formData['lastName']}
                onChange={(value) => handleChange('lastName', value)}
              />
            </LegacyStack.Item>
          </LegacyStack>
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['email']}
                onChange={(value) => handleChange('email', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill>
              <FormControl
                {...formData['username']}
                onChange={(value) => handleChange('username', value)}
              />
            </LegacyStack.Item>
          </LegacyStack>
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['phone']}
                onChange={(value) => handleChange('phone', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill></LegacyStack.Item>
          </LegacyStack>
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['password']}
                onChange={(value) => handleChange('password', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill>
              <FormControl
                {...formData['passwordConfirm']}
                onChange={(value) => handleChange('passwordConfirm', value)}
              />
            </LegacyStack.Item>
          </LegacyStack>
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['gender']}
                onChange={(value) => handleChange('gender', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill>
              <FormControl
                {...formData['birthday']}
                onChange={(value) => handleChange('birthday', value)}
              />
            </LegacyStack.Item>
          </LegacyStack>
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['countryId']}
                onChange={(value) => handleChange('countryId', value)}
                options={countryOptions}
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
