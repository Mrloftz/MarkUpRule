import React from 'react'
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form, InputNumber } from 'antd';
import styled from 'styled-components'
import { GetFare, DeleteFare, UpdateFare, CreateFare } from '../../_service/MethodApi';
import axios from 'axios';

const EditableContext = React.createContext();
const EditTableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
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
        });
    };
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
        this.form = form;
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
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
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
                editable: true,
            },
            {
                title: 'To',
                dataIndex: 'priceTo',
                editable: true,
            },
            {
                title: 'Type',
                dataIndex: 'markupType',
                editable: true,
            },
            {
                title: 'Rate',
                dataIndex: 'markupRate',
                editable: true,
            },
            {
                title: 'Delete',
                dataIndex: 'delete',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            dataSource: [
                {
                    key: '0',
                    name: '',
                    priceFrom: '0',
                    priceTo: '0',
                    markupType: 'Input Your Type',
                    markupRate: '0',
                },
            ],
            count: 2,
        }
    }
    async componentDidMount() {
        const CheckParams = this.props.params
        console.log(CheckParams)
        const data = await GetFare(CheckParams)
        console.log(data)
        this.setState({ dataSource: data.data.fareDetails })
        // console.log(getFareId)
        // this.setState({
        //     markupRate: getFareId.markupRate,
        //     markupType: getFareId.markupType,
        //     priceFrom: getFareId.priceFrom,
        //     priceTo: getFareId.priceTo,
        // })
    }
    handleDelete = id => {
        const dataSource = [...this.state.dataSource];
        console.log(dataSource.id)
        this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            priceFrom: 0,
            priceTo: 0,
            markupType: `Input Your Type ${count}`,
            markupRate: '0',
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };
    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    handleInput = (e) => {
        this.setState({ name: e.target.value})
    }
    submitForm() {
        const { dataSource } = this.state;
        const CheckParams = this.props.params
        let data = {
            name: this.state.name,
            fareDetails: dataSource.map(value => {
                return {
                    markupRate: value.markupRate,
                    markupType: value.markupType,
                    priceFrom: value.priceFrom,
                    priceTo: value.priceTo,
                }
            })
        }
        if (CheckParams) {
            data = { ...data, 
                id: CheckParams}
             UpdateFare(data)
        } else {
            const respon =  CreateFare(data)
            console.log(respon)
        }
        // CreateFare({
        //     name: this.state.name,
        //     fareDetails: dataSource.map(value => {
        //         return {
        //             markupRate: value.markupRate,
        //             markupType: value.markupType,
        //             priceFrom: value.priceFrom,
        //             priceTo: value.priceTo,
        //         }
        //     })

        // })
    }
    render() {
        const { dataSource } = this.state;
        console.log(dataSource)
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
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
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <ContainarSub>
                    <h1>Fare</h1>
                    <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                        Add a row
            </Button>
                    <Input type="text" name="name" value={this.state.name} onChange={this.handleInput} placeholder="Input your table name" style={{ width: 'fit-content', marginLeft: '10px' }} />
                    <TableWrapper
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                </ContainarSub>
                <ContainerButton>
                    <Button type="danger">
                        Remove
                </Button>
                    <Button type="primary" onClick={() => this.submitForm()}>
                        Save
                </Button>
                </ContainerButton>
            </div>
        );
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

