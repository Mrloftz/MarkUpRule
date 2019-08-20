import React from 'react'
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetAllMarkUpRule, CreateMarkupRule } from '../../_service/MethodApi';
import styled from 'styled-components'
import { DatePicker, Button, Input } from 'antd'
import moment from 'moment'
import axios from 'axios';


const { TextArea } = Input;
class MarkUpRuleComponent extends React.Component {
    state = {
        data : [],
        fareData : [],
        startDateTime: moment(),
        endDateTime: moment(),
        nameMarkupRule: '',
        fareId: '',
        criteriaId: '',
    }

   async componentDidMount() {
        const data = await GetAllMarkUpRule() 
        // console.log(data.data)
        const selectCriteriaData = data.data.map(value => {
            return {
                label : value.criteria.name , value
            }
        })
        const selectFareData = data.data.map(value => {
            return {
                label : value.fare.name , value
            }
        })
        this.setState({
            selectCriteriaData,
            selectFareData,
        })
    }
    handleDateChange = (e, key) =>  {
        console.log(e, key)
        this.setState({ [key]: e})
    }

    handleInput =  (e) => {
        this.setState({ nameMarkupRule : e.target.value})
    }

    onSelectChange({value}) {
        console.log(value)
        const { fare } = value
        this.setState({
            fareData : fare.fareDetails,
            fareId: fare.id
        })
        const { criteria } = value
        this.setState({ 
            name : criteria.name,
            destinations: criteria.destinations,
            countries: criteria.countries,
            paxTypes: criteria.paxTypes,
            activityNames: criteria.activityNames,
            criteriaId: criteria.id
        })
    }

    submitForm() {
        alert('test')
        // let data = new FormData()
        // data.append('name', this.state.nameMarkupRule)
        // data.append('fareId', this.state.fareId)
        // data.append('criteriaId', this.state.criteriaId)
        // data.append('startDateTime', moment(this.state.startDateTime).format('YYYY-MM-DD'))
        // data.append('endDateTime', moment(this.state.endDateTime).format('YYYY-MM-DD'))
        
        CreateMarkupRule({
            name : this.state.nameMarkupRule,
            fareId :  this.state.fareId,
            criteriaId : this.state.criteriaId,
            startDateTime: moment(this.state.startDateTime).format('YYYY-MM-DD'),
            endDateTime: moment(this.state.endDateTime).format('YYYY-MM-DD'),
        })
    }

    render() {
        const { selectCriteriaData, selectFareData } = this.state
        console.log(this.state)
        return(
    <div className="container" >
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <Select options={ selectCriteriaData } onChange={(e) => this.onSelectChange(e)} />
      </div>
      <div className="col-md-4"></div>
    </div>
    <Titlesub>Name: {this.state.name}</Titlesub>
    <Titlesub>Destinations: {this.state.destinations}</Titlesub>
    <Titlesub>Country Code: {this.state.countries}</Titlesub>
    <Titlesub>Type of Pax: {this.state.paxTypes}</Titlesub>
    <Titlesub>Activity Name: {this.state.activityNames}</Titlesub>

    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <Select options={ selectFareData } onChange={(e) => this.onSelectChange(e)} />
      </div>
      <div className="col-md-4"></div>
    </div>    
    {
        this.state.fareData.map(fare => {
            return <React.Fragment>
        <Titlesub>From: {fare.priceFrom}</Titlesub>
        <Titlesub>To: {fare.priceTo}</Titlesub>
        <Titlesub>Type: {fare.markupType}</Titlesub>
        <Titlesub>Rate: {fare.markupRate}</Titlesub>
            </React.Fragment>
        })
    }
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
    <div>
        <TextArea type="text" name="nameMarkupRule" value={this.state.nameMarkupRule} onChange={this.handleInput} placeholder="Input your name" autosize />
    </div>
    <br />
    <div style={{ float: 'right'}}>
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

