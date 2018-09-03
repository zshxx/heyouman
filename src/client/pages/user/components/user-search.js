import React from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button, Radio } from 'antd'
import _ from 'lodash'

@Form.create({
  mapPropsToFields({ list }) {
    const params = list.get('params').toJS()

    // 转为antd 需要格式
    const fields = _.mapValues(params, value => Form.createFormField({ value }))

    return fields
  }
})
export default class UserSearch extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    query: PropTypes.func.isRequired,
    list: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { form, list } = this.props
    const defaultParams = list.get('defaultParams').toJS()

    form.setFieldsInitialValue(_.omit(defaultParams, ['pageSize', 'pageIndex']))
  }

  render() {
    const { form, list } = this.props
    const { getFieldDecorator } = form
    const loading = list.get('loading')
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }

    return (
      <Form onSubmit={this.onSubmit}>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label="用户昵称" {...formItemLayout}>
              {getFieldDecorator('nickname')(<Input />)}
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="状态" {...formItemLayout}>
              {getFieldDecorator('status', { initialValue: '' })(
                <Radio.Group>
                  <Radio value="">全部</Radio>
                  <Radio value={1}>启用</Radio>
                  <Radio value={2}>禁用</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8} className="actions">
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Button type="primary" icon="search" loading={loading} htmlType="submit">
              查询
            </Button>

            <Button type="default" icon="reload" onClick={() => form.resetFields()}>
              重置
            </Button>
          </Form.Item>
        </Row>
      </Form>
    )
  }

  // 提交查询
  onSubmit = e => {
    e.preventDefault()
    const { form, query } = this.props

    form.validateFields((errors, params) => {
      if (!errors) {
        // 查询跳转回第一页
        params.pageIndex = 1
        query(params)
      }
    })
  }
}
