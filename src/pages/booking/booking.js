import React from 'react'
import BookingComponent  from '../../components/booking/bookingPage';
import { HomeLayout } from '../../components/layout/home-layout';


class BookingPage extends React.Component {
    render() {
        const params = this.props.match.params
        const {history} = this.props
        return(
            <HomeLayout>
            <BookingComponent params={params} history={history}/>
            </HomeLayout>
     
        )
    }
}

export default BookingPage