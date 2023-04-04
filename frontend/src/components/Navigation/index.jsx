import React from 'react'
import { LegacyCard, Listbox } from '@shopify/polaris'
import routes from '../../routes'

function Navigation(props) {
  const { location, navigate } = props

  return (
    <LegacyCard>
      <div style={{ width: 200, margin: '0.5em 0' }}>
        <Listbox accessibilityLabel="Basic Listbox example" onSelect={(value) => navigate(value)}>
          {routes.map((item, index) => (
            <Listbox.Option
              key={index}
              value={item.path}
              selected={
                item.path === '' || item.path === '/'
                  ? location.pathname === item.path
                  : location.pathname.includes(item.path)
              }
              disabled={
                item.path === '' || item.path === '/'
                  ? location.pathname === item.path
                  : location.pathname.includes(item.path)
              }
            >
              {item.title}
            </Listbox.Option>
          ))}
        </Listbox>
      </div>
    </LegacyCard>
  )
}

export default Navigation
