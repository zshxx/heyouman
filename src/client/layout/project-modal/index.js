import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

import { Modal, Form, Input, Select } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

class Creatproject extends Component {
  static get propTypes() {
    return {
      department: PropTypes.array,
      onCancel: PropTypes.func,
      form: PropTypes.object,
      modalVisible: PropTypes.bool,
      onCreate: PropTypes.func
    }
  }
  render() {
    const { modalVisible, onCancel, onCreate, form, department } = this.props
    const { getFieldDecorator } = form
    return modalVisible ? (
      <Modal
        visible={modalVisible}
        title="新建项目"
        maskClosable={false}
        width="50%"
        okText="新建"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form>
          <FormItem label="项目名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入项目名称！' }],
              initialValue: ''
            })(<Input placeholder="项目名称" />)}
          </FormItem>
          <FormItem label="部门">
            {getFieldDecorator('depart', {
              rules: [{ required: true, message: '请选择部门！' }],
              valuePropName: 'value',
              initialValue: { key: `${department[0].id}`, label: department[0].name }
            })(
              <Select placeholder="部门" labelInValue dropdownClassName="rightSidebar-dropdown">
                {department.map((item, index) => {
                  return (
                    <Option key={index} value={`${item.id}`}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    ) : null
  }
}

export default Form.create()(Creatproject)
