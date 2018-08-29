import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Row, Col, Breadcrumb } from 'antd'
import './index.less'

class BreadCrumb extends Component {
  static get propTypes() {
    return {
      // nicknameCN: PropTypes.string,
      // list: PropTypes.array,
      // productid: PropTypes.string,
      // handleSelectProduct: PropTypes.func,
      // handleDoSearch: PropTypes.func
    }
  }
  state = {
    departmentName: 'QA&EP'
  }
  render() {
    // const { nicknameCN, list, productid, handleSelectProduct, handleDoSearch } = this.props
    return (
      <Row>
        <Col md={24} style={{ marginBottom: '15px' }}>
          {this.state.activeProductObj && (
            <Breadcrumb separator=">">
              <Breadcrumb.Item>{this.state.activeProductObj.departmentName || ''}</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.activeProductObj.name || ''}</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.currentPageTitle}</Breadcrumb.Item>
            </Breadcrumb>
          )}
        </Col>
      </Row>
    )
  }
}

export default BreadCrumb
