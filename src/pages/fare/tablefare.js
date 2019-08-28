import React, { Component } from 'react'
import { HomeLayout } from '../../components/layout/home-layout';
import TableFare from '../../components/fare/table/tableFare';


class TableFarePage extends Component {

    render() {
        return(
            <HomeLayout>
                <TableFare />
            </HomeLayout>
        )
    }
}

export default TableFarePage