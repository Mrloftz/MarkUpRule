import React from 'react'

class TableShared extends React.Component {

    render() {
        <TableWrapper
        style={{ marginTop: '2rem' }}
        columns={this.props.columns}
        dataSource={this.props.dataSource}
        pagination={{
            showSizeChanger: true,
            position: 'top',
            total: '',
            defaultPageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        rowKey="id"
    />
    }
}

export default TableShared