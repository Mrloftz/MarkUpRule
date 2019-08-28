import React from 'react'
import { GetBookingDetail } from '../../_service/MethodApi';
import styled from 'styled-components'
import { Button } from 'antd'
import moment from 'moment'

class BookingComponent extends React.Component {
    state = {
        data: [],
        reference: '',
        status: '',
        clientReference: '',
        pendingAmount: '',
        total: '',
        totalNet: '',
        holdername: '',
        holderemail: '',
        activitiesname: '',
        code: '',
        statusactivities: '',
        dateFrom: '',
        dateTo: '',
        paxes: null,
        cancellationPolicies: null,
        comments: '',
    }
    async componentDidMount() {
        const CheckParams = this.props.params
        console.log(CheckParams.id)
        const BookingDetail = await GetBookingDetail(CheckParams.id)
        console.log('test', BookingDetail.data.activities[0])
        this.setState({
            reference: BookingDetail.data.reference,
            status: BookingDetail.data.status,
            clientReference: BookingDetail.data.clientReference,
            pendingAmount: BookingDetail.data.pendingAmount,
            total: BookingDetail.data.total,
            totalNet: BookingDetail.data.totalNet,
            holdername: BookingDetail.data.holder.name,
            holderemail: BookingDetail.data.holder.email,
            activitiesname: BookingDetail.data.activities[0].name,
            code: BookingDetail.data.activities[0].code,
            statusactivities: BookingDetail.data.activities[0].status,
            dateFrom: moment(BookingDetail.data.activities[0].dateFrom),
            dateTo: moment(BookingDetail.data.activities[0].dateTo),
            paxes: BookingDetail.data.activities[0].paxes,
            cancellationPolicies: BookingDetail.data.activities[0].cancellationPolicies,
            // comments: BookingDetail.data.activities[0].comments
        })
    }

    //  CancelBooking = async id => {
    //      const CheckParams = this.props.params
    //     await CancelBooking(CheckParams.id)
    // }
    render() {
        console.log(this.state.dateFrom)
        return (
            <div className="container">
                <div>
                    <HeadItem>Booking Detail</HeadItem>
                    <SubItem>reference: {this.state.reference}</SubItem>
                    <SubItem>status: {this.state.status}</SubItem>
                    <SubItem>clientReference: {this.state.clientReference}</SubItem>
                    <SubItem>pendingAmount: {this.state.pendingAmount}</SubItem>
                    <SubItem>total: {this.state.total}</SubItem>
                    <SubItem>totalNet: {this.state.totalNet}</SubItem>
                    <SubItem style={{ borderBottom: '1px solid #212529' }}></SubItem>
                    <HeadItem>holder</HeadItem>
                    <SubItem>name:{this.state.holdername}</SubItem>
                    <SubItem>email:{this.state.holderemail}</SubItem>
                    <SubItem style={{ borderBottom: '1px solid #212529' }}></SubItem>
                    <HeadItem>activities</HeadItem>
                    <SubItem>name:{this.state.activitiesname}</SubItem>
                    <SubItem>code:{this.state.code}</SubItem>
                    <SubItem>status:{this.state.status}</SubItem>
                    <SubItem>date From-to:{moment(this.state.dateFrom).format("MM/DD/YYYY")} | {moment(this.state.dateTo).format("MM/DD/YYYY")}</SubItem>
                    <SubItem>paxes:{this.state.paxes ? this.state.paxes[0].name : null}</SubItem>
                    <SubItem>cancellationPolicies:{this.state.cancellationPolicies ? this.state.cancellationPolicies[0].bookingActivityId : null} </SubItem>
                    <SubItem>comments:{this.state.comments}</SubItem>
                    <SubItem>Supplier:</SubItem>
                    <ContainerButton>
                        <Button type="primary" style={{ marginTop: '2rem' }}>Cancel Booking</Button>
                    </ContainerButton>
                </div>

            </div>
        )

    }
}
const ContainerButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

const SubItem = styled.div`
    margin-top: 1rem;
`

const HeadItem = styled.h1`
    // padding: 2rem;
`
export default BookingComponent