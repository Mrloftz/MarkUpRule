import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form, InputNumber } from 'antd';
import styled from 'styled-components'
import { GetFare, GetFareAll, DeleteFare, UpdateFare } from '../../_service/MethodApi';
import axios from 'axios';

// const FormItem = Form.Item;
// const EditableContext = React.createContext();

// const EditableRow = ({ form, index, ...props }) => (
//     <EditableContext.Provider value={form}>
//         <tr {...props} />
//     </EditableContext.Provider>
// );

// const EditableFormRow = Form.create()(EditableRow);

// class EditableCell extends React.Component {
//     getInput = () => {
//         if (this.props.inputType === 'number') {
//             return <InputNumber />;
//         }
//         return <Input />;
//     }

//     render() {
//         const {
//             editing,
//             dataIndex,
//             title,
//             inputType,
//             record,
//             index,
//             ...restProps
//         } = this.props;
//         return (
//             <EditableContext.Consumer>
//                 {(form) => {
//                     const { getFieldDecorator } = form;
//                     return (
//                         <td {...restProps}>
//                             {editing ? (
//                                 <FormItem style={{ margin: 0 }}>
//                                     {getFieldDecorator(dataIndex, {
//                                         rules: [{
//                                             required: true,
//                                             message: `Please Input ${title}!`,
//                                         }],
//                                         initialValue: record[dataIndex],
//                                     })(this.getInput())}
//                                 </FormItem>
//                             ) : restProps.children}
//                         </td>
//                     );
//                 }}
//             </EditableContext.Consumer>
//         );
//     }
// }

// class FareComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { fareItem: [], editingKey: '' };
//         this.columns = [
//             {
//                 title: 'From',
//                 dataIndex: 'priceFrom',
//                 editable: true,
//             },
//             {
//                 title: 'To',
//                 dataIndex: 'priceTo',
//                 editable: true,
//             },
//             {
//                 title: 'Type',
//                 dataIndex: 'markupType',
//                 editable: true,
//             },
//             {
//                 title: 'Rate',
//                 dataIndex: 'markupRate',
//                 editable: true,
//             },
//             {
//                 title: 'Operation',
//                 dataIndex: 'operation',
//                 render: (text, record) => {
//                     const editable = this.isEditing(record);
//                     return (
//                         <div>
//                             {editable ? (
//                                 <span>
//                                     <EditableContext.Consumer>
//                                         {form => (
//                                             <a
//                                                 onClick={() => this.save(form, record.id)}
//                                                 style={{ marginRight: 8 }}
//                                             >
//                                                 Save
//                                             </a>
//                                         )}
//                                     </EditableContext.Consumer>
//                                     <Popconfirm
//                                         title="Sure to calcel?"
//                                         onConfirm={() => this.cancel(record.id)}
//                                     >
//                                         <a>cancel</a>
//                                     </Popconfirm>
//                                 </span>
//                             ) : (
//                                     <a onClick={() => this.edit(record.id)}>Edit</a>
//                                 )}
//                         </div>
//                     );
//                 },
//             },
//         ];
//     }

//     handlePriceFrom = e => {
//         this.setState({ priceFrom: e.target.value })
//     }
//     handlePriceTo = e => {
//         this.setState({ priceTo: e.target.value })
//     }
//     handleMarkupType = e => {
//         this.setState({ markupType: e.target.value })
//     }
//     handleMarkupRate = e => {
//         this.setState({ markupRate: e.target.value })
//     }
//     handleFareName = e => {
//         this.setState({ name: e.target.value })
//     }

//     handleSubmit = e => {
//         e.preventDefault();
//         UpdateFare({
//             id: this.state.id,
//             name: this.state.name,
//             fareDetails: [
//                 {
//                     id: this.state.id,
//                     fareId: this.state.fareId,
//                     priceFrom: this.state.priceFrom,
//                     priceTo: this.state.priceTo,
//                     markupType: this.state.markupType,
//                     markupRate: this.state.markupRate,
//                     updateType: this.state.updateType,
//                 }
//             ]
//         })
//     }

//     componentDidMount() {
//         //   const res = GetFare(CheckParams.id)
//         //   axios.get(`http://travizgo.dosetech.co:7799/fare/${id}`)
//         //   .then(res => {
//         //   this.setState({ fareItem: res.data })
//     }

//     handleAdd = () => {
//         const { fareItem } = this.state
//         const newData = {
//             priceForm: '',
//             priceTo: '',
//             markupType: '',
//             markupRate: '',
//         }
//         this.state({
//             fareItem: [...fareItem, newData]
//         })
//     }

//     isEditing = (record) => {
//         return record.id === this.state.editingKey;
//     }

//     edit(id) {
//         console.log('fareItem', this.state.fareItem.id);
//     }

//     save(form, id) {
//         console.log('key', id)
//         form.validateFields((error, row) => {
//             if (error) {
//                 return;
//             }
//             const newData = [...this.state.fareItem];
//             const index = newData.findIndex(item => id === item.id);
//             if (index > -1) {
//                 const item = newData[index];
//                 newData.splice(index, 1, { ...item, ...row });
//                 this.setState({ fareItem: newData, editingKey: '' })
//                 console.log('newData', newData[index]) // data update to api
//             } else {
//                 newData.push(this.state.fareItem);
//                 this.setState({ fareItem: newData, editingKey: '' })
//             }
//         })
//     }

//     cancel = () => {
//         this.setState({ editingKey: '' });
//     }

//     render() {
//         const components = {
//             body: {
//                 row: EditableFormRow,
//                 cell: EditableCell,
//             }
//         }
//         const columns = this.columns.map((col) => {
//             if (!col.editable) {
//                 return col;
//             }
//             return {
//                 ...col,
//                 onCell: record => ({
//                     record,
//                     inputType: col.dataIndex === 'priceForm' ? 'number' : 'text',
//                     dataIndex: col.dataIndex,
//                     title: col.title,
//                     editing: this.isEditing(record),
//                 }),
//             };
//         });

//         return (
//             <div>
//                 <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
//                     Add a row
//             </Button>
//                 <Table
//                     rowKey={this.state.id}
//                     components={components}
//                     bordered
//                     dataSource={this.state.fareItem}
//                     columns={columns}
//                     rowClassName="editable-row"
//                 />
//             </div>

//         );
//     }
// }
// export default FareComponent



























































// const FormItem = Form.Item;
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
                    priceFrom: '0',
                    priceTo: '0',
                    markupType: 'Input Your Type',
                    markupRate: '0',
                },
            ],
            count: 2,
        }
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
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

    render() {
        const { dataSource } = this.state;
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
                    <Input placeholder="Input your table name" style={{ width: 'fit-content', marginLeft: '10px'}}/>
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
                    <Button type="primary">
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

