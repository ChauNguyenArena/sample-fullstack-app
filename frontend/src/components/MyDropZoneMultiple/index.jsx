import PropTypes from 'prop-types'
import { DropZone, LegacyStack, Thumbnail, Caption } from '@shopify/polaris'
import { NoteMinor } from '@shopify/polaris-icons'
import { useState, useEffect, useCallback } from 'react'

MyDropZoneMultiple.propTypes = {
  files: PropTypes.array,
  onChange: PropTypes.func,
}

MyDropZoneMultiple.defaultProps = {
  files: [],
  onChange: () => null,
}

function MyDropZoneMultiple(props) {
  const { onChange } = props

  const [files, setFiles] = useState(props.files || [])

  useEffect(() => {
    onChange(files)
  }, [files])

  const handleDropZoneDrop = useCallback((_dropFiles, acceptedFiles, _rejectedFiles) => {
    // setFiles((files) => [...files, ...acceptedFiles])
    setFiles([...acceptedFiles])
  }, [])

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']

  // const fileUpload = !files.length && <DropZone.FileUpload />
  const fileUpload = <DropZone.FileUpload />
  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: '0' }}>
      <LegacyStack vertical>
        {files.map((file, index) => (
          <LegacyStack alignment="center" key={index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type) ? window.URL.createObjectURL(file) : NoteMinor
              }
            />
            <div>
              {file.name} <Caption>{file.size} bytes</Caption>
            </div>
          </LegacyStack>
        ))}
      </LegacyStack>
    </div>
  )

  return (
    <div style={{ width: '100px', minHeight: '100px' }}>
      <DropZone onDrop={handleDropZoneDrop} allowMultiple={true}>
        {/* {uploadedFiles} */}
        {fileUpload}
      </DropZone>
    </div>
  )
}

export default MyDropZoneMultiple
