import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import styled from 'styled-components'
import { GetFare, GetFareAll, DeleteFare } from '../../_service/MethodApi';
import axios from 'axios';

const EditTableContext = React.createContext();

const EditTableRow = ({ form, index, ...props }) => (
    <EditTableContext.Provider value={form}>
        <tr {...props} />
    </EditTableContext.Provider>
);

const EditableFormRow = Form.create()(EditTableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        })
    }

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                >
                    {children}
                </div>
            );
    };
    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditTableContext.Consumer>{this.renderCell}</EditTableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}

class FareComponent extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: 'From',
                dataIndex: 'priceFrom',
                key: 'priceFrom',
                editable: true,
            },
            {
                title: 'To',
                dataIndex: 'priceTo',
                key: 'priceTo',
                editable: true,
            },
            {
                title: 'Type',
                dataIndex: 'markupType',
                key: 'markupType',
                editable: true,
            },
            {
                title: 'Rate',
                dataIndex: 'markupRate',
                key: 'markupRate',
                editable: true,
            },
            {
                title: 'Delete',
                dataIndex: 'delete',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete" onConfirm={() => this.handleDelete(record.id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ]
        this.state = {
            dataSource: []
        }
    }
    async componentDidMount() {

    }

    handleDelete = id => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            priceFrom: "Input your Value",
            priceTo: "Input your Value",
            markupType: "Input your Type",
            markupRate: "Input your Rate",
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.id === item.id)
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });
        this.setState({ dataSource: newData })
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            };
        });
        return (
            <div>
                <ContainarSub>
                    <Button
                        onClick={this.handleAdd}
                        type="primary"
                        style={{ marginBottom: 16 }}
                    >
                        Add a row
                </Button>
                    <TableWrapper
                        components={components}
                        rowClassName={() => "editable-row"}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        rowKey="id"
                    />
                    <ContainerButton>
                        <Button type="danger" onCick={() => DeleteFare()}>
                            Remove
                            </Button>
                        <Button type="primary" htmlType="submit">
                            Save
                            </Button>
                    </ContainerButton>
                </ContainarSub>

            </div>
        )
    }
}

const ContainerButton = styled.div`
  display: flex;
  margin-top: 1rem;
  float: right
`

const TableWrapper = styled(Table)`
  .ant-table {
    overflow-y: scroll;
  }
`
const ContainarSub = styled.div`
  background: #d6f4fd;
  padding: 2rem;
`
export default FareComponent

