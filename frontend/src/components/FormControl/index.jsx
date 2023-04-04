import { RadioButton, Select, LegacyStack, TextField } from '@shopify/polaris'
import MyDropZoneMultiple from '../MyDropZoneMultiple'
import MyDropZoneSingle from '../MyDropZoneSingle'
import MyAutocomplete from '../MyAutocomplete'

function FormControl(props) {
  let label = props.label ? (
    <span>
      {props.label}
      {props.required ? <b style={{ color: 'rgb(220, 53, 69)' }}> *</b> : null}
    </span>
  ) : null

  switch (props.type) {
    case 'file':
      return (
        <LegacyStack vertical spacing="extraTight">
          {label && <LegacyStack.Item>{label}</LegacyStack.Item>}
          <LegacyStack.Item>
            {props.allowMultiple ? (
              <MyDropZoneMultiple {...props} files={props.value} />
            ) : (
              <MyDropZoneSingle {...props} file={props.value} />
            )}
          </LegacyStack.Item>
        </LegacyStack>
      )

    case 'select':
      return <Select {...props} label={label || ''} />

    case 'radio':
      return (
        <LegacyStack vertical spacing="extraTight">
          {label && <LegacyStack.Item>{label}</LegacyStack.Item>}
          <LegacyStack>
            {props.options?.length > 0 &&
              props.options.map((item, index) => (
                <RadioButton
                  key={index}
                  label={item.label}
                  checked={item.value === props.value}
                  onChange={() => props.onChange?.(item.value)}
                />
              ))}
          </LegacyStack>
        </LegacyStack>
      )

    case 'autocomplete':
      return <MyAutocomplete {...props} label={label || ''} />

    default:
      // text
      return (
        <TextField {...props} label={label || ''} onClearButtonClick={() => props.onChange('')} />
      )
  }
}

export default FormControl
