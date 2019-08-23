import React from 'react'
import 'antd/dist/antd.css'
import { Table, Popconfirm, Input, Button } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GetAllMarkUpRule, GetListMarkupRule, DeleteMarkUpRule } from '../../../_service/MethodApi';
import CreateMarkUpRule from '../../button/createMarkUpRule';


const { Search } = Input
class TableMarkUpRule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      pagination: {},
      searchText: '',
    }
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Criteria',
        dataIndex: 'criteria.name',
        key: '',
      },
      {
        title: 'Destinations',
        dataIndex: 'criteria.destination',
        key: '',
      },
      {
        title: 'Country Code',
        dataIndex: 'criteria.country',
        key: '',
      },
      {
        title: 'Type of Pax',
        dataIndex: 'criteria.paxTypes',
        key: '',
      },
      {
        title: 'Activity Name',
        dataIndex: 'criteria.activityName',
        key: '',
      },
      {
        title: 'Edit',
        key: 'edit',
        render: (text, record) => (
          <span>
            <Link to={`/markuprule/${record.id}`}>
              <Button type="primary">Edit</Button>
            </Link>
          </span>
        )
      },
      {
        title: 'Delete',
        key: 'delete',
        render: (text, record) => (
          <span>
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
              <Button type="danger">Delete</Button>
            </Popconfirm>
          </span>
        )
      },
    ]
  }
  async componentDidMount() {
    const dataSource = await GetAllMarkUpRule()
    console.log(dataSource)
    this.setState({ dataSource: dataSource.data })
  }
  handleDelete = async id => {
      // e.preventDefault()
      await DeleteMarkUpRule(id)
      this.setState({ dataSource: this.state.dataSource.filter(item => item.id !== id) })
    }
  handleSearch = async value => {
    //axios get search api
    const dataSource = await GetListMarkupRule(value)
    this.setState({ dataSource: dataSource.data })
  }
  render() {
    const columns = this.columns
    return (
      <div>
        <ContainarSub>
          <h1>MarkUpRule</h1>
          <CreateMarkUpRule />
          <ContainSearch>
            <Search
              style={{ width: '80%', float: 'right', marginRight: '1rem' }}
              placeholder="input search text"
              onSearch={value => this.handleSearch(value)}
              enterButton
            />
          </ContainSearch>
          <TableWrapper
            style={{ marginTop: '2rem' }}
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={{
              showSizeChanger: true,
              position: 'top',
              total: '',
              defaultPageSize: 10,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            rowKey="id"
          />
        </ContainarSub>
      </div>
    )
  }
}

const ContainarSub = styled.div`
  background: #d6f4fd;
  padding: 2rem;
`
const ContainSearch = styled.div`
  float: right;
`
const TableWrapper = styled(Table)`
  .ant-table {
    overflow-y: scroll;
  }
`
export default TableMarkUpRule