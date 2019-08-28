import React, { Component } from 'react'
import { HomeLayout } from '../../components/layout/home-layout';
import TableMarkUpRule from '../../components/markuprule/table/tableMarkUprule';


class TableMarkUpRulePage extends Component {
    render() {
        return(
            <HomeLayout>
                <TableMarkUpRule />
            </HomeLayout>
        )
    }
}

export default TableMarkUpRulePage