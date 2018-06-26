import React from 'react'

import Layout from './layout'
import withMenu from './with-menu'

import { userInfo, menus, appCode, baseURI, responsive, defaultLayout } from 'common/config'
const { nickname } = userInfo

const withLayout = (layout = defaultLayout) => WrappedComponent => {
  const CustomerLayout = withMenu(Layout)

  return class extends React.Component {
    static displayName = `${layout}Layout`

    render() {
      return layout !== 'blank' ? (
        <CustomerLayout
          menus={menus}
          logoutUrl={`${baseURI}/logout`}
          userName={nickname}
          title={appCode}
          appCode={appCode}
          logo={require('../assets/images/logo.svg')}
          responsive={responsive}
          className={this.className}
          layout={layout}
        >
          <WrappedComponent {...this.props} />
        </CustomerLayout>
      ) : (
        <WrappedComponent {...this.props} />
      )
    }

    get className() {
      let className = `papaya-layout papaya-layout-${layout}`
      if (responsive) {
        className += ' papaya-layout-responsive'
      }

      return className
    }
  }
}

export default withLayout
