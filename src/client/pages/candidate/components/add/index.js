import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Icon, Form, Input, Select, Radio } from 'antd'
import './index.less'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const { TextArea } = Input

const companyType = [
  {
    label: '普通公司',
    value: 0
  },
  {
    label: '开发中的客户',
    value: 1
  },
  {
    label: '已签约的客户',
    value: 2
  },
  {
    label: '历史客户',
    value: 3
  }
]

class Company extends Component {
  static propTypes = {
    form: PropTypes.object,
    handleSave: PropTypes.func
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
  handleSubmit = (e) => {
    e.preventDefault()
    const { handleSave, form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
      handleSave(values)
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const formItemLayout100 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    }
    const btnFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 10,
          offset: 2
        }
      }
    }

    return (
      <div className='m-company-add'>
        <div className='add-form'>
          <Form className='addforms' onSubmit={this.handleSubmit}>
            <FormItem className='add-basis100'
              {...formItemLayout100}
              label='公司类型'
            >
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: 'Please input your E-mail!'
                }]
              })(
                <RadioGroup>
                  {companyType.map((item) => {
                    return <Radio key={item.value} value={item.value}>{item.label}</Radio>
                  })}
                </RadioGroup>
              )}
            </FormItem>
            <FormItem className='add-formitem'
              {...formItemLayout}
              label='公司名称'
            >
              {getFieldDecorator('companyName', {
                rules: [{
                  required: true, message: 'Please input your E-mail!'
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem className='add-formitem'
              {...formItemLayout}
              label='英文名称'
            >
              {getFieldDecorator('companyEnName', {
                rules: [{
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem className='add-formitem'
              {...formItemLayout}
              label='城市'
            >
              {getFieldDecorator('companyCity', {
                rules: [{
                  required: true, message: 'Please input your E-mail!'
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem className='add-formitem'
              label='行业'
              {...formItemLayout}
            >
              {getFieldDecorator('companyIndustry', {
                rules: [{
                  required: true, message: 'Please input your E-mail!'
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem className='add-formitem'
              label='公司简写'
              {...formItemLayout}
            >
              {getFieldDecorator('companyAlias', {
                rules: [{
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem className='add-formitem'
              label='电话'
              {...formItemLayout}
            >
              {getFieldDecorator('companyTel', {
                rules: [{
                  required: true, message: 'Please input your E-mail!'
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem className='add-formitem'
              label='地址'
              {...formItemLayout}
            >
              {getFieldDecorator('companyAddress', {
                rules: [{
                  required: true, message: 'Please input your E-mail!'
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem className='add-formitem'
              label='邮箱'
              {...formItemLayout}
            >
              {getFieldDecorator('contactEmail', {
                rules: [{
                  required: true, message: 'Please input your E-mail!'
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem className='add-formitem'
              label='联系人'
              {...formItemLayout}
            >
              {getFieldDecorator('contactName', {
                rules: [{
                  required: true, message: 'Please input your E-mail!'
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem className='add-formitem'
              label='联系电话'
              {...formItemLayout}
            >
              {getFieldDecorator('contactTel', {
                rules: [{
                  required: true, message: 'Please input your E-mail!'
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem className='add-basis100'
              label='客户简介'
              {...formItemLayout100}
            >
              {getFieldDecorator('companyProfile', {
                rules: [{
                }]
              })(
                <TextArea rows={4} />
              )}
            </FormItem>
            <FormItem className='add-basis100' {...btnFormItemLayout}>
              <Link to={`/company`}><Button type='default'>取消</Button></Link>
              <Button type='primary' style={{marginLeft: '20px'}} htmlType='submit'>确定</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Company)
