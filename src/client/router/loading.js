import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'

const Loading = ({ error }) => {
  if (error) {
    NProgress.done()
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <div style={{ color: '#434e59', fontSize: 50, fontWeight: 700 }}>页面咔嚓了:(</div>
      </div>
    )
  } else {
    return null
  }
}
Loading.propTypes = {
  error: PropTypes.object
}
export default Loading
