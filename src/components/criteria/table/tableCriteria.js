import React from 'react'
import 'antd/dist/antd.css'
import { Table, Popconfirm, Input, Button } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CreateCriteria from '../../button/createCriteria';


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
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Departure',
                dataIndex: 'destinations',
                key: 'destinations'
            },
            {
                title: 'Country Code',
                dataIndex: 'countries',
                key: 'countries'
            },
            {
                title: 'Type of Pax',
                dataIndex: 'paxTypes',
                key: 'paxTypes'
            },
            {
                title: 'Activity Name',
                dataIndex: 'activityNames',
                key: 'activityNames'
            },
            {
                title: 'Edit',
                key: 'edit',
                render: (text, record) => (
                    <span>
                        <Link to={`/criteria/${record.id}`}>
                            <Button type="primary">Edit</Button>
                        </Link>
                    </span>
                )
            },
            {
                title: 'Delete',
                key: 'delete',
                render: (text, record) => (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                        <Button type="danger">Delete</Button>
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
                    <CreateCriteria />
                    <ContainSearch>
                        <Search
                            style={{ width: '80%', float: 'right', marginRight: '1rem' }}
                            placeholder="input search text"
                            onSearch={value => this.handleSearch(value)}
                            enterButton
                        />
                    </ContainSearch>
                    <TableWrapper
                        rowKey="id"
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