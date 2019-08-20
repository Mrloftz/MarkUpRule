import React, { useState, useEffect } from 'react'
import { GetMarkupRule, GetAllMarkUpRule, GetCriteriaAll } from '../../_service/MethodApi';
import { Formik } from 'formik';



class MarkUpRuleComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            criteria: [],
            selectedOption: '',
        }
    }
   async componentDidMount() {
        GetCriteriaAll()
        .then(res => {
            this.setState({
                criteria: res.data
            })
            console.log("Check", this.state.criteria)
        })
    }
    handleChange = (selectedOption) => {
        this.setState({
            selectedOption
        })
    }
    handleSubmit = () => {

    }
    render() {
        let options = this.state.criteria.map(function (data) {
            return { value: data.id, label: data.name}
        })
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Criteria</h3>
                <label>
                    Pick your choosen : 
                    <select 
                    name="form-field-name"
                    value={this.state.value} 
                    onChange={this.handleChange}
                    options={this.state.criteria}
                    style={{ display: 'block' }}
                    />
                </label>
            </form>
        )
    }
}

export default MarkUpRuleComponent

