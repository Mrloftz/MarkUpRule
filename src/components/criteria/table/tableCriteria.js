import React from 'react'
import 'antd/dist/antd.css'
import { Table, Popconfirm, Input } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { GetCriteriaAll, DeleteCriteria, GetListCriteria } from '../../../_service/MethodApi';


const { Search } = Input
class TableCriteria extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            pagination: {},
            searchText: ''
        }
        this.columns = [
            {
                title: 'Departure',
                dataIndex: 'destination',
                key: ''
            },
            {
                title: 'Country Code',
                dataIndex: 'country',
                key: ''
            },
            {
                title: 'Type of Pax',
                dataIndex: 'paxType',
                key: ''
            },
            {
                title: 'Activity Name',
                dataIndex: 'activityName',
                key: ''
            },
            {
                title: 'Edit',
                key: 'edit',
                render: (text, record) => (
                    <span>
                        <Link to={`/criteria/${record.id}`}>
                            <label>Edit</label>
                        </Link>
                    </span>
                )
            },
            {
                title: 'Delete',
                key: 'delete',
                render: (text, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                        <label>Delete</label>
                    </Popconfirm>
                )
            },
        ]
    }
    async componentDidMount() {
        // axios get Data all
        const dataSource = await GetCriteriaAll()
        this.setState({ dataSource: dataSource.data })
    }
    handleDelete = async id => {
        // axios Delete data 
        await DeleteCriteria(id)
        this.setState({ dataSource: this.state.dataSource.filter(item => item.id !== id) })
    }
    handleSearch = async value => {
        // axios get search api
        const dataSource = await GetListCriteria(value)
        this.setState({ dataSource: dataSource.data })
    }
    render() {
        const columns = this.columns
        return (
            <div>
                <ContainarSub >
                    <h1>Criteria</h1>
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
                        rowkey="id"
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


export default TableCriteria