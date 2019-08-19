import React from 'react'
import 'antd/dist/antd.css'
import { Table, Popconfirm, Input, Button } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GetFareAll, DeleteFare, GetList, GetFare, GetCriteria } from '../../../_service/MethodApi';
import { BreadCrumb } from '../../breadcrum'
import CreateFare from '../../button/createFare';

const { Search } = Input
class TableFare extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            pagination: {},
            searchText: '',
        }
        this.columns = [
            {
                title: 'Group Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Edit',
                key: 'edit',
                render: (text, record) => (
                    <span>
                        <Link to={`/fare/${record.id}`}>
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
            }
        ]
    }
    async componentDidMount() {
        // axios get Data all
        const dataSource = await GetFareAll()
        this.setState({ dataSource: dataSource.data})
    }
    handleDelete = async id => {
        await DeleteFare(id)
        this.setState({ dataSource: this.state.dataSource.filter(item => item.id !== id)})
    }
    handleSearch = async value => {
        // axios get search api
        const dataSource = await GetList(value)
        this.setState({ dataSource: dataSource.data })
    }
    render() {
        const columns = this.columns
        return (
            <div>
                <ContainarSub>
                    <BreadCrumb />
                    <h1>Fare</h1> 
                    <CreateFare />
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
export default TableFare