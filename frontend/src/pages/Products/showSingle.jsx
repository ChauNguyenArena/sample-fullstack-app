import React from 'react'
import PropTypes from 'prop-types'
import { Icon, LegacyStack } from '@shopify/polaris'
import { CancelMajor } from '@shopify/polaris-icons'
import FormControl from '../../components/FormControl'

const ShowSingle = (props) => {
  const { data, handleRemove, handleChange } = props

  return (
    <LegacyStack vertical distribution="fillEvenly">
      <LegacyStack.Item>
        <span>Thumbnail</span>
      </LegacyStack.Item>
      <LegacyStack.Item>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          {data.originalValue && (
            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
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
                width="100px"
                height="100px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '10px',
                  border: 'dashed gray',
                  borderWidth: '1px',
                }}
                src={data.originalValue}
              />
            </div>
          )}
          <FormControl {...data} onChange={handleChange} />
        </div>
      </LegacyStack.Item>
    </LegacyStack>
  )
}

ShowSingle.propTypes = {}

export default ShowSingle
