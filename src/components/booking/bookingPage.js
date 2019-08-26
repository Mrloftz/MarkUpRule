import React from 'react'
import { GetBookingDetail } from '../../_service/MethodApi';

class BookingComponent extends React.Component {
    state = {
        data: []
    }
    async componentDidMount() {
        const CheckParams = this.props
        console.log(CheckParams)
        const BookingDetail = await GetBookingDetail(151) 
        console.log(BookingDetail)
        this.setState({ 
            data: BookingDetail.data
        })
    }
    render() {
        return(
            <div className="container">
                <div className="col-xs-8">
                    <h1>Booking Detail</h1>
                </div>
            </div>
        )

    }
}
export default BookingComponent