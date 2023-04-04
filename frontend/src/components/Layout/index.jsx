import { Stack } from '@shopify/polaris'
import Navigation from '../Navigation'

function Layout(props) {
  const { children } = props

  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
      <Navigation {...props} />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

export default Layout
