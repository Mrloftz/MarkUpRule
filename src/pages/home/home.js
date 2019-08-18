import React from 'react'
import TableFare from '../../components/fare/table/tableFare';
import TableCriteria from '../../components/criteria/table/tableCriteria'
import TableMarkUpRule from '../../components/markuprule/table/tableMarkUprule';
import { HomeLayout } from '../../components/layout/home-layout';
class HomePage extends React.Component {
    state = {
        key : 'fare'
    }

    onChangeTable({key}) {
        this.setState({ key })
    }
    render() {
        const { key} = this.state
        console.log(key)
        return(
            <HomeLayout onChangeTable={(key) => this.onChangeTable(key)}>
                    {key === 'fare' && <TableFare />}
                    {key === 'criteria' && <TableCriteria />}
                    {key === 'markuprule' && <TableMarkUpRule />}

            </HomeLayout>
         
        )
    }
}

export default HomePage