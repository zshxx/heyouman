import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button, message, Popconfirm } from 'antd'

export default class UserList extends React.Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    query: PropTypes.func.isRequired
  }

  render() {
    const { list, query } = this.props

    const { loading, dataSource, params } = list.toJS()

    return (
      <div>
        <div style={{ display: 'flex', marginBottom: 8 }}>
          <h2 style={{ marginBottom: 0 }}>待处理列表</h2>
          <div className="actions" style={{ flex: 1, textAlign: 'right' }}>
            {this.toolContent}
          </div>
        </div>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.columns}
          dataSource={dataSource.list}
          pagination={{
            total: dataSource.total,
            pageSize: params.pageSize,
            current: params.pageIndex,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条`,
            onChange: pageIndex => query({ pageIndex })
          }}
        />
      </div>
    )
  }

  get columns() {
    const { showModal } = this.props

    const columns = [
      { dataIndex: 'id', title: '用户ID' },
      { dataIndex: 'nickname', title: '用户昵称' },
      { dataIndex: 'nicknameCn', title: '用户名' },
      { dataIndex: 'mobile', title: '手机号码' },
      {
        dataIndex: 'status',
        title: ' 状态',
        render(text) {
          return {
            1: '启用',
            2: '禁用'
          }[text]
        }
      },
      {
        title: '操作',
        width: 120,
        render: (text, record) => {
          return (
            <span className="actions">
              <a onClick={() => showModal(record)}>编辑</a>
              <Popconfirm
                placement="topRight"
                title="确定要删除该项？"
                onConfirm={() => this.remove(record.id)}
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          )
        }
      }
    ]

    return columns
  }

  get toolContent() {
    const { showModal } = this.props

    return (
      <Button icon="plus" type="primary" onClick={() => showModal()}>
        新增
      </Button>
    )
  }

  remove = id => {
    const { remove, query } = this.props

    remove(id).then(() => {
      query()
      message.success('删除成功！')
    })
  }
}
