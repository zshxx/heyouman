import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button, Icon } from 'antd'
import './index.less'

const FormItem = Form.Item

class SearchForm extends React.Component {
  static propTypes = {
    form: PropTypes.object
  }

  state = {
    expand: false
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  }

  getFields () {
    const { getFieldDecorator } = this.props.form
    const children = []
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const count = this.state.expand ? 10 : 3
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i}>
          <FormItem label={`Field ${i}`} style={{ display: i < count ? 'block' : 'none' }}
            {...formItemLayout}
          >
            {getFieldDecorator(`field-${i}`, {
              rules: [{
                required: true,
                message: 'Input something!'
              }]
            })(
              <Input placeholder='placeholder' />
            )}
          </FormItem>
        </Col>
      )
    }
    return children
  }

  render () {
    return (
      <Form
        className='m-search-form'
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type='primary' htmlType='submit'>搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清除
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              收缩 <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(SearchForm)
