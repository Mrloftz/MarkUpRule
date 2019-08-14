import React from 'react'
import 'antd/dist/antd.css'
import { Table, Popconfrime, Divider, Input } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { async } from 'q';
import Search from 'antd/lib/input/Search';


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
                dataIndex: '',
                key: ''
            },
            {
                title: 'Arrival',
                dataIndex: '',
                key: ''
            },
            {
                title: '',
                dataIndex: '',
                key: ''
            },
            {
                title: '',
                dataIndex: '',
                key: ''
            },
            {
                title: '',
                dataIndex: '',
                key: ''
            },
            {
                title: '',
                dataIndex: '',
                key: ''
            }
        ]
    }
    async componentDidMount() {
        // axios get Data all
    }
    handleDelete = async () => {
        // axios Delete data 
    }
    handleSearch = async () => {
        // axios get search api
    }
    render() {
        const columns = this.columns
        return(
            <div>
                <ContainarSub >
                    <h1>Criteria</h1>
                    <ContainSearch>
                        <Search
                        style={{ width: '80%', float: 'right', marginRight: '1rem'}}
                        placeholder="input search text"
                        onSearch={value => this.handleSearch(value)}
                        enterButton
                        />
                    </ContainSearch>
                    <TableWrapper
                    style={{ marginTop: '2rem'}}
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={{
                        showSizeChanger:true,
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