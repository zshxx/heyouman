import React from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import Loading from './loading'

export default function lazyloader (path) {
  return Loadable({
    loader: () => {
      NProgress.start()
      return import(/* webpackChunkName: "route-[request]" */ `../pages/${path}/index.js`).catch(
        // eslint-disable-next-line
        e => console.error(e)
      )
    },
    render: (loaded, props) => {
      NProgress.done()
      const LoadableComponent = loaded.default || loaded
      return <LoadableComponent {...props} />
    },
    loading: Loading
  })
}
