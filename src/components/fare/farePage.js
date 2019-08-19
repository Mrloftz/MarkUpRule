import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import styled from 'styled-components'
import { GetFare } from '../../_service/MethodApi';
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";
class FareComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };
        this.renderEditable = this.renderEditable.bind(this);
    }
    async componentDidMount() {
        // const CheckParams = this.props.match.params
        // if (CheckParams.id) {
        //     const { data } = await axios.get(`http://travizgo.dosetech.co:7799/fare/${CheckParams.id}`)
        //     console.log(data)
        // }
    }

    handleInputChange = (cellInfo, event) => {
        let data = [...this.state.data];
        data[cellInfo.index][cellInfo.column.id] = event.target;

        this.setState({ data });
    };


    renderEditable = cellInfo => {
        const cellValue = this.state.data[cellInfo.index][cellInfo.column.id];

        return (
            <input
                placeholder="type here"
                name="input"
                type="text"
                onChange={this.handleInputChange.bind(null, cellInfo)}
                value={cellValue}
            />
        );
    };

    render() {
        // const CheckParams = this.props.match.params
        const { data } = this;
        return (
            <div>
                <Form>
                    <ReactTable
                        data={data}
                        columns={[
                            {
                                Header: "From",
                                accessor: "priceFrom",
                                Cell: this.renderEditable
                            },
                            {
                                Header: "To",
                                accessor: "priceTo",
                                Cell: this.renderEditable
                            },
                            {
                                Header: "Type",
                                accessor: "markupType",
                                Cell: this.renderEditable
                            },
                            {
                                Header: "Rate",
                                accessor: "markupRate",
                                Cell: this.renderEditable
                            },
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    >
                        {(state, makeTable, instance) => {
                            console.log('UPDATE');
                            return makeTable();
                        }}
                    </ReactTable>
                </Form>

                <ContainerButton>
                    <Button type="danger">
                        Remove
                            </Button>
                    <Button type="primary" htmlType="submit">
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
  float: right;
`
export default FareComponent
// export const FareComponent = props => {
//     const [priceFrom, setPriceFrom] = useState()
//     const [priceTo, setPriceto] = useState()
//     const [markupType, setMarkupType] = useState()
//     const [markupRate, setMarkupRate] = useState()

//     const CheckParams = props.params
//     console.log(CheckParams)
//     const { history } = props

//     useEffect(() => {
//         const fetchData = async id => {
//             const { data } = await GetFare(id)
//             console.log(data)
//         }
//         if (CheckParams.id) {
//             fetchData(CheckParams.id)
//         }
//     }, [CheckParams.id])

//     return (
//         <div>
//             <ReactTable
//             data={data}
//             columns={[
//                 {
//                     header: "From",
//                     accessor: "From",
//                     Cell: this.re

//                 }
//             ]}
//         </div>
//     )
// }
// const EditTableContext = React.createContext();

// const EditTableRow = ({ form, index, ...props }) => (
//     <EditTableContext.Provider value={form}>
//         <tr {...props} />
//     </EditTableContext.Provider>
// )
// const EditableFormRow = Form.create()(EditTableRow)
// class EditableCell extends React.Component {

//     state = {
//         editing: false,
//     }

//     toggleEdit = () => {
//         const editing = !this.state.editing
//         this.setState({ editing }, () => {
//             if (editing) {
//                 this.input.focus();
//             }
//         })
//     }
//     save = e => {
//         const { record, handleSave } = this.props
//         this.form.validateFields((error, values) => {
//             if (error && error[e.currentTarget.id]) {
//                 return;
//             }
//             this.toggleEdit();
//             handleSave({ ...record, ...values });
//         })
//     }
//     renderCell = form => {
//         this.form = form;
//         const { children, dataIndex, record, title } = this.props
//         const { editing } = this.state
//         return editing ? (
//             <Form.Item style={{ margin: 0 }}>
//                 {Form.getFieldDecorator(dataIndex, {
//                     rules: [
//                         {
//                             required: true,
//                             message: `${title} is required.`,
//                         },
//                     ],
//                     initialValue: record[dataIndex],
//                 })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
//             </Form.Item>
//         ) : (
//                 <div
//                     className="editable-cell-value-wrap"
//                     style={{ paddingRight: 24 }}
//                     onClick={this.toggleEdit}
//                 >
//                     {children}
//                 </div>
//             )
//     }

//     render() {
//         const {
//             editable,
//             dataIndex,
//             title,
//             record,
//             index,
//             handleSave,
//             children,
//             ...restProps
//         } = this.props;
//         return (
//             <td {...restProps}>
//                 {editable ? (
//                     <EditTableContext.Consumer>{this.renderCell}</EditTableContext.Consumer>
//                 ) : (
//                         children
//                     )}
//             </td>
//         )
//     }
// }

// class EditableTable extends React.Component {
//     constructor(props) {
//         super(props)
//         this.columns = [
//             {
//                 title: 'PriceFrom',
//                 dataIndex: 'priceFrom',
//                 editable: true
//             },
//             {
//                 title: 'PriceTo',
//                 dataIndex: 'priceTo',
//                 editable: true
//             },
//             {
//                 title: 'Type',
//                 dataIndex: 'markupType',
//                 editable: true
//             },
//             {
//                 title: 'Rate',
//                 dataIndex: 'markupRate',
//                 editable: true
//             },
//             {
//                 title: 'Edit',
//                 dataIndex: 'edit',
//                 render: (text, record) => {
//                     const { editingKey } = this.state;
//                     const editable = this.isEditing(record);
//                     return editable ? (
//                         <span>
//                             <EditTableContext.Consumer>
//                                 {form => (
//                                     <a
//                                         onClick={() => this.save(form, record.key)}
//                                         style={{ marginRight: 8 }}
//                                     >
//                                         Save
//                                     </a>
//                                 )}
//                             </EditTableContext.Consumer>
//                             <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
//                                 <a>Cancel</a>
//                             </Popconfirm>
//                         </span>
//                     ) : (
//                             <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
//                                 Edit
//                         </a>
//                         )
//                 }
//             },
//         ]

//         this.state = {
//             dataSource: []
//         }
//     }



//     handleDelete = key => {
//         const dataSource = [...this.state.dataSource]
//         this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
//     }

//     handleAdd = () => {
//         const { count, dataSource } = this.state
//         const newData = {
//             key: count,
//             title: '',
//             priceTo: '',
//             priceFrom: '',
//             markupType: '',
//             markupRate: '',
//         };
//         this.setState({
//             dataSource: [...this, newData],
//             count: count + 1
//         })
//     }
//     handleSave = row => {
//         const newData = [...this.state.dataSource]
//         const index = newData.findIndex(item => row.key === item.key);
//         const item = newData[index];
//         newData.splice(index, 1, {
//             ...item,
//             ...row
//         })
//         this.setState({ dataSource: newData })
//     }

//     render() {
//         const { dataSource } = this.state;
//         const components = {
//             body: {
//                 row: EditableFormRow,
//                 cell: EditableCell
//             }
//         }
//         const columns = this.columns.map(col => {
//             if (!col.editable) {
//                 return col;
//             }
//             return {
//                 ...col,
//                 onCell: record => ({
//                     record,
//                     editable: col.editable,
//                     dataIndex: col.dataIndex,
//                     title: col.title,
//                     handleSave: this.handleSave
//                 })
//             }
//         })
//         return (
//             <div>
//                 <ContainarSub>
//                     <Button
//                         onClick={this.handleAdd}
//                         type="primary"
//                         style={{ marginBottom: 16, float: 'right' }}
//                     >
//                         Add a row
//                 </Button>
//                     <TableWrapper
//                         components={components}
//                         rowClassName={() => "editable-row"}
//                         bordered
//                         dataSource={dataSource}
//                         columns={columns}
//                     />
//                 </ContainarSub>

//             </div>
//         )
//     }
// }

const ContainarSub = styled.div`
  background: #d6f4fd;
  padding: 2rem;
`
const TableWrapper = styled(Table)`
  .ant-table {
    overflow-y: scroll;
  }
`