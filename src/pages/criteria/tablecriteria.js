import React, { Component } from 'react'
import { HomeLayout } from '../../components/layout/home-layout';
import TableCriteria from '../../components/criteria/table/tableCriteria';

class TableCriteriaPage extends Component {
    render() {
        return (
            <HomeLayout>
                <TableCriteria />
            </HomeLayout>
        )
    }
}

export default TableCriteriaPage