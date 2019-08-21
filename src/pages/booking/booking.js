import React from 'react'
import BookingComponent  from '../../components/booking/bookingPage';
import { HomeLayout } from '../../components/layout/home-layout';


class BookingPage extends React.Component {
    render() {
        const params = this.props.match.params
        return(
            <HomeLayout>
            <BookingComponent params={params}/>
            </HomeLayout>
     
        )
    }
}

export default BookingPage