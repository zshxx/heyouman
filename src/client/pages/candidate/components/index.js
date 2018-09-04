import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Icon, Select } from 'antd'
import './index.less'

export default class RequirementPool extends Component {
  static propTypes = {
    getPoolList: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      showCardModal: false,
      cardActionType: ''
    }
  }
  componentDidMount () {
  }
  render () {
    return (
      <div className='m-candidate'>人才库</div>
    )
  }
}
