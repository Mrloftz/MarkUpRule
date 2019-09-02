import React from 'react'
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreateMarkupRule, GetCriteriaAll, GetFareAll, GetMarkupRule, DeleteMarkUpRule, UpdateMarkUpRule } from '../../_service/MethodApi';
import styled from 'styled-components'
import { DatePicker, Button, Input } from 'antd'
import moment from 'moment'
import ListBodyWrapper from 'antd/lib/transfer/renderListBody';
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
        this.setState({
            criteriaId: DataMarkupRule.data.criteriaId,
            destinations: DataMarkupRule.data.criteria.destinations,
            countries: DataMarkupRule.data.criteria.countries,
            paxTypes: DataMarkupRule.data.criteria.paxTypes,
            activityNames: DataMarkupRule.data.criteria.activityNames,
            fareData: DataMarkupRule.data.fare.fareDetails,
            fareId: DataMarkupRule.data.fareId,
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
    handleDelete () {
        const CheckParams = this.props.params
        DeleteMarkUpRule(CheckParams.id)
    }
    async submitForm() {

        const { history } = this.props
        const CheckParams = this.props.params
        let data = {
            name: this.state.nameMarkupRule,
            fareId: this.state.fareId,
            criteriaId: this.state.criteriaId,
            startDateTime: moment(this.state.startDateTime).format('YYYY-MM-DD'),
            endDateTime: moment(this.state.endDateTime).format('YYYY-MM-DD'),
        }
        if (CheckParams.id) {
            alert("Update Success")
            data = { ...data, id: CheckParams.id }
            await UpdateMarkUpRule(data)
        } else {
            alert("Create Success")
            await CreateMarkupRule(data)
        }
        history.push("/")
    }
    render() {
        const CheckParams = this.props.params
        const { selectCriteriaData, selectFareData } = this.state
        console.log(this.state)
        return (    
                <div className="container">          
                {!CheckParams && <h1>Create MarkUprule</h1>}
                {CheckParams && <h1>Edit MarkUpRule: {this.state.nameMarkupRule} </h1>}
                <div className="row">
          
                   
                <div className="col-md-12">
                    <label>Name</label>
                    <TextArea type="text" name="nameMarkupRule" value={this.state.nameMarkupRule} onChange={this.handleInput} placeholder="กรุณาใส่รายละเอียดฟอร์ม" autosize />
                </div>
                <div className="col-md-6">
                    <div>Date From</div>
                    <DatePicker
                        name="startDateTime"
                        placeholder="Start Date"
                        value={this.state.startDateTime}
                        onChange={(e) => this.handleDateChange(e, 'startDateTime')}
                    />
                    </div>
                    <div className="col-md-6">
                        <div>Date To</div>
                    <DatePicker
                        name="endDateTime"
                        placeholder="End Date"
                        value={this.state.endDateTime}
                        onChange={(e) => this.handleDateChange(e, 'endDateTime')}
                    />
                </div>
                    <div className="col-md-6">
                        <h1 style={{ textAlign: "center" }}>Criteria</h1>
                        <Select options={selectCriteriaData} onChange={(e) => this.onSelectChange(e, 1)} />
                        {CheckParams.id && <Titlesub>Name :{this.state.selectnameCriteria}</Titlesub>}
                {/* <Titlesub>Name: {this.state.selectnameCriteria}</Titlesub> */}
                <Titlesub>Destinations: {this.state.destinations}</Titlesub>
                <Titlesub>Country Code: {this.state.countries}</Titlesub>
                <Titlesub>Type of Pax: {this.state.paxTypes}</Titlesub>
                <Titlesub>Activity Name: {this.state.activityNames}</Titlesub>
                    </div>
                    <div className="col-md-6">
                        <h1 style={{ textAlign: "center" }}>Fare</h1>
                        <Select options={selectFareData} onChange={(e) => this.onSelectChange(e, 2)} />
                        {CheckParams.id && <Titlesub>Name : {this.state.selectnameFare}</Titlesub>}
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
                    </div>                
   
                </div>
                 <div style={{ float: 'right' }}>
                    {CheckParams.id && <Button type="danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) DeleteMarkUpRule(CheckParams.id)}}>Remove</Button>}
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

