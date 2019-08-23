import React from 'react'
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetAllMarkUpRule, CreateMarkupRule, GetCriteriaAll, GetFareAll, GetCriteria, GetFare, GetMarkupRule, UpdateCriteria } from '../../_service/MethodApi';
import styled from 'styled-components'
import { DatePicker, Button, Input } from 'antd'
import moment from 'moment'

const { TextArea } = Input;
class MarkUpRuleComponent extends React.Component {
    state = {
        data: [],
        fareData: [],
        startDateTime: moment(),
        endDateTime: moment().add(1, 'days'),
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
        selectnameCriteria: '',
        selectnameFare: '',
    }
    async componentDidMount() {
        const CheckParams = this.props.params
        console.log(CheckParams.id)
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
        const DataMarkupRule = await GetMarkupRule(CheckParams.id)
        console.log(DataMarkupRule.data)
        this.setState({
            criteriaId: DataMarkupRule.data.criteria.criteriaId,
            destinations: DataMarkupRule.data.criteria.destinations,
            countries: DataMarkupRule.data.criteria.countries,
            paxTypes: DataMarkupRule.data.criteria.paxTypes,
            activityNames: DataMarkupRule.data.criteria.activityNames,
            fareData: DataMarkupRule.data.fare.fareDetails,
            fareId: DataMarkupRule.data.fare.fareId,
            priceFrom: DataMarkupRule.data.fare.priceFrom,
            priceTo: DataMarkupRule.data.fare.priceTo,
            nameMarkupRule: DataMarkupRule.data.name,
            startDateTime: moment(DataMarkupRule.data.startDateTime),
            endDateTime: moment(DataMarkupRule.data.endDateTime),
            selectnameCriteria: DataMarkupRule.data.criteria.name,
            selectnameFare: DataMarkupRule.data.fare.name
        })
    }
    handleDateChange = (e, key) => {
        console.log(e, key)
        this.setState({ [key]: e })
    }
    handleInput = (e) => {
        this.setState({ nameMarkupRule: e.target.value })
    }
    onSelectChange({ value }, key) {
        console.log(value)
        if (key === 1) {
        const criteria = value

            this.setState({
                name: criteria.name,
                destinations: criteria.destinations,
                countries: criteria.countries,
                paxTypes: criteria.paxTypes,
                activityNames: criteria.activityNames,
                criteriaId: criteria.id
            })
        } else {
        const fare = value
        this.setState({
            fareData: fare.fareDetails,
            fareId: fare.id,
            markupRate: fare.markupRate,
            priceFrom: fare.priceFrom,
            priceTo: fare.priceTo
        })
        }
    }
    async submitForm() {
        alert('จัดไปดิคั่บ')
        const CheckParams = this.props.params
        let data = {
            name: this.state.nameMarkupRule,
            fareId: this.state.fareId,
            criteriaId: this.state.criteriaId,
            startDateTime: moment(this.state.startDateTime).format('YYYY-MM-DD'),
            endDateTime: moment(this.state.endDateTime).format('YYYY-MM-DD'),
        }
        if (CheckParams.id) {
            data = {...data, id: CheckParams.id } 
            await UpdateCriteria(data)
        } else {
            await CreateMarkupRule(data)
        }
        // CreateMarkupRule({
        //     name: this.state.nameMarkupRule,
        //     fareId: this.state.fareId,
        //     criteriaId: this.state.criteriaId,
        //     startDateTime: moment(this.state.startDateTime).format('YYYY-MM-DD'),
        //     endDateTime: moment(this.state.endDateTime).format('YYYY-MM-DD'),
        // })
    }
    render() {
        const { selectCriteriaData, selectFareData } = this.state
        console.log(this.state)
        return (
            <div className="container" >
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Select options={selectCriteriaData} onChange={(e) => this.onSelectChange(e, 1)} />
                        <h1 style={{ textAlign: "center" }}>Criteria</h1>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <Titlesub>Name: {this.state.selectnameCriteria}</Titlesub>
                <Titlesub>Destinations: {this.state.destinations}</Titlesub>
                <Titlesub>Country Code: {this.state.countries}</Titlesub>
                <Titlesub>Type of Pax: {this.state.paxTypes}</Titlesub>
                <Titlesub>Activity Name: {this.state.activityNames}</Titlesub>

                <br />
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Select options={selectFareData} onChange={(e) => this.onSelectChange(e, 2)} />
                        <h1 style={{ textAlign: "center" }}>Fare</h1>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                     {
                    this.state.fareData.map((fare, index) => {
                        return <React.Fragment key={index}>
                            <Titlesub>Name: {this.state.selectnameFare}</Titlesub>
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

