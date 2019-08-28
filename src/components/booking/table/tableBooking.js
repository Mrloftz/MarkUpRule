import React from 'react'
import 'antd/dist/antd.css'
import { Table, Input, Button, Modal } from 'antd'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GetBookingList, GetSearch } from '../../../_service/MethodApi';


const { Search } = Input
class TableBooking extends React.Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            pagination: {},
            searchText: '',
            modal2Visible: false
        }

        this.columns = [
            {
                title: 'Reference',
                dataIndex: 'reference',
                key: 'reference'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Currency',
                dataIndex: 'currency',
                key: 'currency',
            },
            {
                title: 'PendingAmount',
                dataIndex: 'pendingAmount',
                key: 'pendingAmount',
            },
            {
                title: 'CreationDate',
                dataIndex: 'creationDate',
                key: 'creationDate',
            },
            {
                title: 'ClientReference',
                dataIndex: 'clientReference',
                key: 'clientReference',
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
            },
            {
                title: 'TotalNet',
                dataIndex: 'totalNet',
                key: 'totalNet',
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                key: 'operation',
                render: (key, record) => (
                    <span>
                        <Link to={`/booking/${record.id}`}>
                            <Button type="primary">
                                View
                            </Button>
                        </Link>
                    </span>
                )
            },
            {
                title: 'Resend Voucher',
                dataIndex: 'resendvoucher',
                key: 'resendvoucher',
                render: (key, record) => (
                    <span>
                        <Button type="primary" onClick={() => this.setModal2Visible(true)}>Click</Button>
                        <Modal
                            title="Do you want to Change Email ?"
                            centered
                            visible={this.state.modal2Visible}
                            onOk={() => this.setModal2Visible(false)}
                            onCancel={() => this.setModal2Visible(false)}
                        >
                            <label>Email</label>
                            <Input />
                        </Modal>
                    </span>
                )
            }

        ]
    }
    async componentDidMount() {
        const dataSource = await GetBookingList()
        console.log(dataSource)
        this.setState({
            dataSource: dataSource.data
        })
    }
    
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }
    
    handleSearch = async value => {
        //axios get search api
        const dataSource = await GetSearch(value)
        this.setState({ dataSource: dataSource.data })
    }
    render() {
        const columns = this.columns
        return (
            <ContainarSub>
                <h1>Booking</h1>
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
                        showsizeChanger: true,
                        position: 'top',
                        totle: '',
                        defaultPageSize: 10,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                />
            </ContainarSub>

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

export default TableBooking