import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Button } from 'antd'
import PropTypes from 'prop-types'

import { Upload, InfoTable, Section, MainContent } from 'components'
import lazyloader from '../../router/lazyloader'

import { history as historyAPI, download } from 'utils'

const Parent = ({ match, history }) => {
  const dataSource = [
    { label: '审批金额', value: '200.00' },
    { label: '审批期限', value: 4 },
    { label: '审批结果', value: ['通过', '审批', 'test'] },
    { label: '信用等级', value: 3 },
    { label: '审批通过时间', value: '2017-07-11 14:34:41' },
    { label: '发券金额', value: 20 },
    { label: '发券时间', value: '' }
  ]

  return (
    <MainContent crumbs={['系统管理', '组件示范']}>
      <InfoTable title="InfoTable 示例" columns={3} dataSource={dataSource} />

      <Section
        title="Section 示例"
        toolContent={
          <Upload action="/upload" showUploadList>
            上传示例
          </Upload>
        }
      >
        <div style={{ padding: 16 }}>
          <p>内容</p>
        </div>
      </Section>

      <InfoTable.Editable
        title="InfoTable.Editable 示例"
        canEdit
        onUpdate={data => {
          /* eslint-disable no-console */
          console.log(data)
          /* eslint-enable no-console */
        }}
        layout={{ title: 1, content: 1 }}
        columns={3}
        dataSource={[
          {
            label: '房产类型',
            dataIndex: 'houseType',
            value: '1',
            editable: true,
            format: 'select',
            dataMap: {
              1: '有',
              0: '无'
            }
          },
          {
            label: '车辆所有权',
            dataIndex: 'carBelong',
            value: '1',
            editable: true,
            format: 'select',
            dataMap: {
              1: '有',
              0: '无'
            }
          }
        ]}
        baseData={{ id: 1 }}
      />
      <Link to="/ui-demo/child">示例 Link 子页面</Link>

      <Button style={{ marginLeft: 8 }} onClick={() => history.push('/ui-demo/child')}>
        示例 在应用内部跳转(基于history Props)
      </Button>

      <Button style={{ marginLeft: 8 }} onClick={() => historyAPI.push('/ui-demo/child')}>
        示例 在应用外部跳转(基于history API)
      </Button>

      <Button style={{ marginLeft: 8 }} onClick={() => download('/downloadurl', 'filename.xls')}>
        文件下载
      </Button>
    </MainContent>
  )
}

Parent.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

Child.propTypes = {
  match: PropTypes.object.isRequired
}

export default function Child({ match }) {
  return [
    // 按需加载
    <Route key="child" component={lazyloader('ui-demo/child')} path={`${match.path}/child`} />,
    // 非按需加载
    <Route key="parent" exact component={Parent} path={`${match.path}`} />
  ]
}
