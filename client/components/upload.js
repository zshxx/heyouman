import React from 'react'
import { Upload } from '@wac/papaya-ui'
import { baseURI, apiPrefix } from 'common/config'

export default function(props) {
  return <Upload prefix={baseURI + apiPrefix} {...props} />
}
