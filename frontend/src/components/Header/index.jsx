import { Button, DisplayText, LegacyStack } from '@shopify/polaris'
import PropTypes from 'prop-types'
import { ArrowLeftMinor } from '@shopify/polaris-icons'

Header.propTypes = {
  title: PropTypes.any,
  actions: PropTypes.array,
  onBack: PropTypes.func,
}

Header.defaultProps = {
  title: '',
  actions: [],
  onBack: undefined,
}

function Header(props) {
  const { title, actions, onBack } = props

  return (
    <LegacyStack>
      {onBack && <Button icon={ArrowLeftMinor} onClick={onBack} />}
      <LegacyStack.Item fill>
        {typeof title === 'string' ? <DisplayText size="small">{title}</DisplayText> : title}
      </LegacyStack.Item>
      <LegacyStack distribution="trailing">
        {actions.map((item, index) => (
          <Button key={index} {...item}>
            {item.label}
          </Button>
        ))}
      </LegacyStack>
    </LegacyStack>
  )
}

export default Header
