import React from 'react'
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetAllMarkUpRule, CreateMarkupRule, GetCriteriaAll, GetFareAll } from '../../_service/MethodApi';
import styled from 'styled-components'
import { DatePicker, Button, Input } from 'antd'
import moment from 'moment'
import axios from 'axios';


const { TextArea } = Input;
class MarkUpRuleComponent extends React.Component {
    state = {
        data: [],
        fareData: [],
        startDateTime: moment(),
        endDateTime: moment(),
        nameMarkupRule: '',
        fareId: '',
        criteriaId: '',
        markupType: '',
        markupRate: '',
        priceFrom: '',
        priceTo: '',
        paxTypes: [],
        destinations: [],
        countries: [],
        activityNames: [],
        name: '',
    }
    async componentDidMount() {
        const dataCriteria = await GetCriteriaAll()
        const selectCriteriaData = dataCriteria.data.map(value => {
            return {
                label: value.name, value
            }
        })
        const dataFare = await GetFareAll()
        const selectFareData = dataFare.data.map(value => {
            return {
                label: value.name, value
            }
        })
        this.setState({
            selectCriteriaData,
            selectFareData,
        })
    }
    handleDateChange = (e, key) => {
        console.log(e, key)
        this.setState({ [key]: e })
    }
    handleInput = (e) => {
        this.setState({ nameMarkupRule: e.target.value })
    }
    onSelectChange({ value }) {
        console.log(value)
        const fare = value
        console.log(fare.fareDetails)
        this.setState({
            fareData: fare.fareDetails,
            fareId: fare.id
            // markupType: fare.markupType,
            // markupRate: fare.markupRate,
            // priceFrom: fare.priceFrom,
            // priceTo: fare.priceTo
        })
        const criteria = value
        console.log(criteria)
        this.setState({
            name: criteria.name,
            destinations: criteria.destinations,
            countries: criteria.countries,
            paxTypes: criteria.paxTypes,
            activityNames: criteria.activityNames,
            criteriaId: criteria.id
        })
    }
    submitForm() {
        alert('จัดไปดิคั่บ')
        CreateMarkupRule({
            name: this.state.nameMarkupRule,
            fareId: this.state.fareId,
            criteriaId: this.state.criteriaId,
            startDateTime: moment(this.state.startDateTime).format('YYYY-MM-DD'),
            endDateTime: moment(this.state.endDateTime).format('YYYY-MM-DD'),
        })
    }
    render() {
        const { selectCriteriaData, selectFareData } = this.state
        console.log(this.state)
        return (
            <div className="container" >
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Select options={selectCriteriaData} onChange={(e) => this.onSelectChange(e)} />
                        <h1 style={{ textAlign: "center" }}>Criteria</h1>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <Titlesub>Destinations: {this.state.destinations}</Titlesub>
                <Titlesub>Country Code: {this.state.countries}</Titlesub>
                <Titlesub>Type of Pax: {this.state.paxTypes}</Titlesub>
                <Titlesub>Activity Name: {this.state.activityNames}</Titlesub>
                <br />
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Select options={selectFareData} onChange={(e) => this.onSelectChange(e)} />
                        <h1 style={{ textAlign: "center" }}>Fare</h1>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                {
                    this.state.fareData.map((fare, index) => {
                        return <React.Fragment key={index}>
                            <Titlesub>From: {fare.priceFrom}</Titlesub>
                            <Titlesub>To: {fare.priceTo}</Titlesub>
                            <Titlesub>Type: {fare.markupType}</Titlesub>
                            <Titlesub>Rate: {fare.markupRate}</Titlesub>
                            <div style={{ borderBottom: '5px solid #212529' }}></div>
                        </React.Fragment>
                    })
                }


                <br />
                <div>
                    <TextArea type="text" name="nameMarkupRule" value={this.state.nameMarkupRule} onChange={this.handleInput} placeholder="กรุณาใส่รายละเอียดฟอร์ม" autosize />
                </div>
                <br />
                <div>
                    <DatePicker
                        name="startDateTime"
                        placeholder="Start Date"
                        value={this.state.startDateTime}
                        onChange={(e) => this.handleDateChange(e, 'startDateTime')}
                    />
                    <DatePicker
                        name="endDateTime"
                        placeholder="End Date"
                        value={this.state.endDateTime}
                        onChange={(e) => this.handleDateChange(e, 'endDateTime')}
                    />
                </div>
                <br />
                <div style={{ float: 'right' }}>
                    <Button type="danger" >Reset</Button>
                    <Button type="primary" onClick={() => this.submitForm()}>Save</Button>
                </div>
            </div>
        )
    }
}
const Titlesub = styled.div`
 margin-top: 1rem;
`
export default MarkUpRuleComponent

