import React, { Component } from 'react'
import { HomeLayout } from '../../components/layout/home-layout';
import TableBooking from '../../components/booking/table/tableBooking';

class TableBookingPage extends Component {
    render() {
        return(
            <HomeLayout>
                <TableBooking />
            </HomeLayout>
        )   
    }
}

export default TableBookingPage