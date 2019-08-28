import React from 'react'
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form, Select } from 'antd';
import styled from 'styled-components'
import { GetFare, DeleteFare, UpdateFare, CreateFare, GetMarkUpType } from '../../_service/MethodApi';


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
// const Option = Select.option
class FareComponent extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: 'From',
                dataIndex: 'priceFrom',
                key: 'priceFrom',
                width: '20%',
                editable: true,
            },
            {
                title: 'To',
                dataIndex: 'priceTo',
                key: 'priceTo',
                width: '20%',
                editable: true,
            },
            {
                title: 'Type',
                dataIndex: 'markupType',
                key: 'markupType',
                // render: () => {
                // return (
                //     <Select style={{width:200}}>
                //         <option>Percent</option>
                //         <option>Bath</option>
                //     </Select>
                // )
                // }
                // render: () => {
                //     const {dataType} = GetMarkUpType()
                //     return (
                //         <Select style={{ width: 200 }}>
                //             {dataType.map(value => (
                //                 <Option key={value}>
                //                     {value.name}
                //                 </Option>
                //             ))}
                //         </Select>
                //     )
                // }
            },
            {
                title: 'Rate',
                dataIndex: 'markupRate',
                width: '20%',
                key: 'markupRate',
                editable: true,
            },
            {
                title: 'Delete',
                dataIndex: 'delete',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
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
                    markupType: 'Input your type',
                    markupRate: '0',
                },
            ],
            count: 2,
        }
    }
    async componentDidMount() {
        // const dataType = await GetMarkUpType()
        // const selectDatatype = dataType.data.map(value => {
        //     return {
        //         label: value.name, value
        //     }
        // })
        // this.setState({ selectDatatype })
        const CheckParams = this.props.params
        const data = await GetFare(CheckParams)
        this.setState({
            dataSource: data.data.fareDetails,
            name: data.data.name
        })
    }
    onSelectChange({ value }) {
        console.log(value)
        const type = value
        this.setState({
            name: type.name
        })
    }
    handleDelete = id => {
        const dataSource = [...this.state.dataSource];
        console.log(dataSource)
        this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            priceFrom: 'Input value',
            priceTo: 'Input value',
            markupType: `Input Your Type ${count}`,
            markupRate: 'Input value',
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
        this.setState({ name: e.target.value })
    }
    submitForm() {
        const { dataSource } = this.state;
        const { history } = this.props
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
            alert("Update Success")
            data = {
                ...data,
                id: CheckParams,
                fareId: CheckParams,
                updateType: "update"
            }
            UpdateFare(data)
        } else {
            alert("Create Success")
            CreateFare(data)
        }
        history.push("/")
    }

    DeleteJa = async () => {
        const CheckParams = this.props.params
        console.log(CheckParams.fareId)
        await DeleteFare(CheckParams)
    }
    render() {
        const CheckParams = this.props.params
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
                        rowKey="id"
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                </ContainarSub>
                <ContainerButton>
                {/* {CheckParams && <Button type="danger" onClick={() => this.DeleteJa(CheckParams)}> */}

                    {CheckParams && <Button type="danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) DeleteFare(CheckParams)}}>
                        Remove
                </Button>}

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

