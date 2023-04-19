import { Checkbox, LegacyStack } from '@shopify/polaris'
import React from 'react'
import FormControl from '../../components/FormControl'

const ShowMultiple = (props) => {
  const { data, handleDelete, handleSelected, handleChange } = props

  return (
    <LegacyStack vertical distribution="fillEvenly">
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <span>Images</span>
        {data.removeValue.length > 0 && (
          <span onClick={handleDelete} style={{ cursor: 'pointer', color: 'red' }}>
            Delete all
          </span>
        )}
      </div>
      <LegacyStack.Item fill>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {data.originalValue.length > 0 &&
            data.originalValue.map((image, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <div
                  id={index}
                  style={{
                    position: 'absolute',
                    right: '13px',
                    top: '0px',
                    height: '10px',
                    width: '10px',
                  }}
                >
                  <Checkbox
                    checked={data.removeValue.includes(image)}
                    onChange={() => handleSelected(image)}
                  />
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
                  src={image}
                />
              </div>
            ))}
          <FormControl {...data} onChange={handleChange} />
        </div>
      </LegacyStack.Item>
    </LegacyStack>
  )
}

export default ShowMultiple
