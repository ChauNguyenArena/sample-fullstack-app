import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  ActionList,
  Button,
  DataTable,
  LegacyCard,
  LegacyStack,
  Pagination,
  Popover,
  Select,
  Thumbnail,
} from '@shopify/polaris'
import { MobileVerticalDotsMajor } from '@shopify/polaris-icons'
import Image from '../../assets/images'
import Search from './Search'
import ConfirmModal from '../../components/ConfirmModal'

const Table = (props) => {
  const { actions, data, onChangePage, onChangeLimit, search, onSearch, onEdit, onDelete } = props
  const { items, page, limit, totalPages, totalItems } = data || {}

  const [selected, setSelected] = useState(null)
  const [deleted, setDeleted] = useState(null)
  console.log('data>>', data)
  let rows = []
  if (items?.length > 0) {
    rows = items.map((item, index) => [
      (page - 1) * limit + index + 1,
      <LegacyStack spacing="tight" wrap={false}>
        <Thumbnail
          size="small"
          source={item.thumbnail || Image.photo_placeholder}
          alt={item.handle}
        />
        <div>
          <h3>
            <b>{item.title}</b>
          </h3>
          <p>
            <i>{item.handle}</i>
          </p>
        </div>
      </LegacyStack>,
      <div>{item.vendor?.name || 'No name'}</div>,
      <div>$ {item.price}</div>,
      <LegacyStack distribution="trailing">
        <Popover
          active={item.id === selected?.id}
          activator={
            <Button
              plain
              onClick={() => setSelected(selected?.id === item.id ? null : item)}
              icon={MobileVerticalDotsMajor}
            />
          }
          onClose={() => setSelected(null)}
        >
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: 'Edit',
                onAction: () => setSelected(null) & onEdit(item),
              },
              {
                content: 'Delete',
                onAction: () => setSelected(null) & setDeleted(item),
              },
            ]}
          />
        </Popover>
      </LegacyStack>,
    ])
  }
  return (
    <LegacyStack vertical alignment="fill">
      <LegacyCard sectioned>
        <Search value={search} onChange={onSearch} />
      </LegacyCard>

      <div>Total items: {totalItems || 'loading...'}</div>

      <LegacyCard>
        <DataTable
          headings={['No.', 'Product', 'Vendor', 'Price', 'Actions']}
          columnContentTypes={['text', 'text', 'text', 'numeric', 'numeric']}
          rows={rows}
          footerContent={items ? (items?.length > 0 ? undefined : 'Have no data') : 'loading..'}
        />

        <LegacyCard.Section>
          <LegacyStack distribution="center">
            <Pagination
              label={`${page} of ${totalPages}`}
              hasPrevious={page > 1}
              onPrevious={() => onChangePage(page - 1)}
              hasNext={page < totalPages}
              onNext={() => onChangePage(page + 1)}
            />
            <Select
              options={[10, 20, 50, 100].map((item) => ({ label: '' + item, value: '' + item }))}
              value={'' + limit}
              onChange={onChangeLimit}
            />
          </LegacyStack>
        </LegacyCard.Section>
      </LegacyCard>

      {deleted && (
        <ConfirmModal
          title="Delete confirmation"
          content="Are your sure want to delete, this cannot be undone?"
          onClose={() => setDeleted(null)}
          secondaryActions={[
            {
              content: 'Discard',
              onAction: () => setDeleted(null),
            },
            {
              content: 'Delete',
              onAction: () => onDelete(deleted) & setDeleted(null),
              destructive: true,
            },
          ]}
        />
      )}
    </LegacyStack>
  )
}

Table.propTypes = {
  // ...appProps,
  data: PropTypes.object,
  onChangePage: PropTypes.func,
  onChangeLimit: PropTypes.func,
  search: PropTypes.string,
  onSearch: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

Table.defaultProps = {
  data: null,
  onEdit: () => null,
  onDelete: () => null,
  onChangePage: () => null,
  onChangeLimit: () => null,
  search: '',
  onSearch: () => null,
}

export default Table
