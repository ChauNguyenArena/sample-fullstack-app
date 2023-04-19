import PropTypes from 'prop-types'
import { DropZone, LegacyStack, Thumbnail, Caption } from '@shopify/polaris'
import { NoteMinor } from '@shopify/polaris-icons'
import { useState, useCallback, useEffect } from 'react'

MyDropZoneSingle.propTypes = {
  file: PropTypes.object,
  onChange: PropTypes.func,
}

MyDropZoneSingle.defaultProps = {
  file: null,
  onChange: () => null,
}

function MyDropZoneSingle(props) {
  const { onChange } = props

  const [file, setFile] = useState(props.file)

  useEffect(() => {
    onChange(file)
  }, [file])

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => setFile((file) => acceptedFiles[0]),
    []
  )

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']

  // const fileUpload = !file && <DropZone.FileUpload />
  const fileUpload = <DropZone.FileUpload />
  const uploadedFile = file && (
    <LegacyStack>
      <Thumbnail
        size="medium"
        alt={file.name}
        source={validImageTypes.includes(file.type) ? window.URL.createObjectURL(file) : NoteMinor}
      />
      {/* <div>
        {file.name} <Caption>{file.size} bytes</Caption>
      </div> */}
    </LegacyStack>
  )

  return (
    <div style={{ width: '100px', minHeight: '100px' }}>
      <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
        {/* {uploadedFile} */}
        {fileUpload}
      </DropZone>
    </div>
  )
}

export default MyDropZoneSingle
