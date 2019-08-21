import React from 'react'
import TableFare from '../../components/fare/table/tableFare';
import TableCriteria from '../../components/criteria/table/tableCriteria'
import TableMarkUpRule from '../../components/markuprule/table/tableMarkUprule';
import { HomeLayout } from '../../components/layout/home-layout';
import TableBooking from '../../components/booking/table/tableBooking';
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
                    {key === 'bookking' && <TableBooking/>}

            </HomeLayout>
         
        )
    }
}

export default HomePage