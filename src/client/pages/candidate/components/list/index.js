import React, { Component } from 'react'
import PropTypes from 'prop-types'
import history from 'utils/history'
import moment from 'moment'
import SearchForm from '../search-form'
import { Button, Table, Divider } from 'antd'
import './index.less'

const columns = [
  {
    title: '公司名称',
    dataIndex: 'companyName'
  },
  {
    title: '城市',
    dataIndex: 'companyCity'
  },
  {
    title: '行业',
    dataIndex: 'companyIndustry'
  },
  {
    title: '英文名称',
    dataIndex: 'companyEnName'
  },
  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '客户简介',
    dataIndex: 'companyProfile'
  },
  {
    title: '联系人',
    dataIndex: 'contactName'
  },
  {
    title: '联系人电话',
    dataIndex: 'contactTel'
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    render: (createdTime) => {
      return moment(createdTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href='javascript:;'>编辑</a>
      </span>
    )
  }
]

export default class Company extends Component {
  static propTypes = {
    list: PropTypes.object,
    getComoanyList: PropTypes.func,
    pageSize: PropTypes.number,
    page: PropTypes.number
  }
  constructor (props) {
    super(props)
    this.state = {
      showCardModal: false,
      cardActionType: ''
    }
  }
  componentDidMount () {
    const { page, pageSize } = this.props

    this.props.getComoanyList({ page, pageSize })
  }
  handleClick = () => {
    history.push('/company/add')
  }
  getContractList = () => {
    history.push('/company/add')
  }
  render () {
    const { list, page, pageSize } = this.props
    const dataSource = list.toJS()

    const pagination = {
      total: dataSource.count,
      current: page,
      pageSize,
      onChange: page => this.getContractList({ page }),
      showTotal: total => `总共 ${total}条`
    }
    return (
      <div className='m-company'>
        <SearchForm />
        <Button type='primary' onClick={this.handleClick}>新增客户</Button>
        <Table
          rowKey='id'
          className='m-company-list'
          columns={columns}
          bordered
          pagination={pagination}
          dataSource={dataSource.rows}
        />
      </div>
    )
  }
}
