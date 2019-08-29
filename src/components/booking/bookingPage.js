import React from 'react'
import { GetBookingDetail, CancelBooking } from '../../_service/MethodApi';
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
        paxes: [],
        cancellationPolicies: '',
        comments: '',
        activities: []
    }
    async componentDidMount() {
        const CheckParams = this.props.params
        console.log(CheckParams.id)
        const BookingDetail = await GetBookingDetail(CheckParams.id)
        console.log(BookingDetail.data)
        this.setState({
            reference: BookingDetail.data.reference,
            status: BookingDetail.data.status,
            clientReference: BookingDetail.data.clientReference,
            pendingAmount: BookingDetail.data.pendingAmount,
            total: BookingDetail.data.total,
            totalNet: BookingDetail.data.totalNet,
            holdername: BookingDetail.data.holder.name,
            holderemail: BookingDetail.data.holder.email,
            activitiesname: BookingDetail.data.activities.name,
            code: BookingDetail.data.activities.code,
            statusactivities: BookingDetail.data.activities.status,
            dateFrom: moment(BookingDetail.data.activities.dateFrom),
            dateTo: moment(BookingDetail.data.activities.dateTo),
            paxes: BookingDetail.data.activities.paxes,
            cancellationPolicies: BookingDetail.data.activities.cancellationPolicies,
            comments: BookingDetail.data.activities.comments,
            activities: BookingDetail.data.activities,
        })
    }

     handleCancelBooking = async () => {
        const { history } = this.props
         alert("Cancel Booking")
         const Checkref = this.state.reference
         console.log(Checkref)
         await CancelBooking(Checkref)
         history.push("/")
    }
    render() {
        console.log(this.state)
        return (
            <div className="container">
                <div>
                    <HeadItem>Booking Detail</HeadItem>
                    <SubItem>reference: {this.state.reference}</SubItem>
                    <SubItem>status: {this.state.status}</SubItem>
                    <SubItem>clientReference: {this.state.clientReference}</SubItem>
                    <SubItem>pendingAmount:{Number(this.state.pendingAmount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</SubItem>
                    <SubItem>total:{Number(this.state.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</SubItem>
                    <SubItem>totalNet: {Number(this.state.totalNet).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</SubItem>
                    <SubItem style={{ borderBottom: '1px solid #212529' }}></SubItem>
                    <HeadItem>holder</HeadItem>
                    <SubItem>name:{this.state.holdername}</SubItem>
                    <SubItem>email:{this.state.holderemail}</SubItem>
                    <SubItem style={{ borderBottom: '1px solid #212529' }}></SubItem>
                    <HeadItem>activities</HeadItem>
                    {this.state.activities.map ((item,index)=> (
                        <div key={index}>
                            <SubItem>name:{item.name}</SubItem>
                            <SubItem>code:{item.code}</SubItem>
                            {/* <SubItem>paxes:{item.paxes}</SubItem> */}
                            <SubItem>cancellationPolicies:{Number(item.cancellationPolicies[0].amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</SubItem>
                            {/* <SubItem>comments:{item.comments}</SubItem> */}
                            <SubItem>status:{item.status}</SubItem>
                            <SubItem>date From-to:{moment(item.dateFrom).format("MM/DD/YYYY")} | {moment(item.dateTo).format("MM/DD/YYYY")}</SubItem>
                            {/* <SubItem>Supplier:</SubItem> */}
                        </div>
                    ))}
                    <ContainerButton>
                        <Button type="primary" style={{ marginTop: '2rem' }} onClick={() => this.handleCancelBooking()}>Cancel Booking</Button>
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