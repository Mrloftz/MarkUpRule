import React, { useState, useEffect } from 'react'
import { GetMarkupRule, GetAllMarkUpRule, GetCriteriaAll } from '../../_service/MethodApi';
import { Formik } from 'formik';



class MarkUpRuleComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            criteria: [],
            clearable: true,
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
                    valueKey={'id'}
                    labelKey={'name'}
                    clearable={this.state.clearable}
                    options={this.state.criteria}
                    />
                </label>
            </form>
        )
    }
}

export default MarkUpRuleComponent


// export const MarkUpRuleComponent = props => {
//     const [name, setName] = useState()
//     const [fareId, setFareId] = useState()
//     const [criteriaId, setCriteriaId] = useState()
//     const [startDateTime, setStartDateTime] = useState()
//     const [endDateTime, setEndDateTime] = useState()
//     const [value, setValue] = useState()
//     const CheckParams = props.params

//     useEffect(() => {
//         const fetchData = async id => {
//             const { data } = await GetMarkupRule(id)
//             console.log(data)
//             setName(data.name)
//         }
//         if (CheckParams.id) {
//             fetchData(CheckParams.id)
//         }

//     }, [CheckParams.id])
//     return (
//         <React.Fragment>
//             <form>
//                 <h3>Criteria</h3>
//             <label>
//                 Pick your fav:
//                 <select value={this.state.value} onChange="this.handleChange">
//                     <option value="" ></option>
//                 </select>
//             </label>
//             </form>


//         </React.Fragment>
//     )
// }