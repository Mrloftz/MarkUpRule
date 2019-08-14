import React from 'react'
import 'antd/dist/antd.css'
import { Table, Popconfirm, Divider, Input } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GetFareAll, DeleteFare, GetFare, GetList } from '../../../_service/MethodApi';
import { BreadCrumb } from '../../breadcrum'

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
                            <label>Edit</label>
                        </Link>
                    </span>
                )
            },
            {
                title: 'Delete',
                key: 'delete',
                render: (record) => (
                    <span>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                            <Divider type="vertical" />
                            <label>Delete</label>
                        </Popconfirm>
                    </span>
                )
            }
        ]
    }



    async componentDidMount() {
        // axios get Data all
        const dataSource = await GetFareAll()
        console.log(dataSource)
        // const dataSource = await GetFare(id)
        // console.log(dataSource)
        // this.setState({ dataSource: dataSource.data.data.})
    }
    handleDelete = () => {
        // axios Delate Data
        // await DeleteFare(id)
        // this.setState({ dataSource: dataSource.data})
    }
    handleSearch = async value => {
        // axios get search api
        const dataSource = await GetList(value)
        this.setState({ dataSource: dataSource.data.fareDetails})
    }
    render() {
        const columns = this.columns
        return (
            <div>
                <ContainarSub> 
                    <BreadCrumb />
                    <h1>Fare</h1>
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