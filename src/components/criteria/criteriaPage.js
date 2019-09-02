import React, { useState, useEffect } from 'react'
import { Formik, Field } from 'formik'
import { FieldInput } from '../../components/input'
import { ValidateSchema } from '../../helper/validator'
import styled from 'styled-components'
import { GetCriteria, DeleteCriteria, UpdateCriteria, CriteriaCreate, GetPaxType } from '../../_service/MethodApi';
import { Button, Checkbox, Form, Col } from 'antd'
import { FieldInputArea } from '../input/in-putarae';
export const CriteriaComponent = props => {
    const [name, setName] = useState()
    const [destinations, setDestinations] = useState([])
    const [destination, setDestination] = useState()
    const [country, setCountry] = useState()
    const [countries, SetCountries] = useState([])
    const [paxTypes, setPaxTypes] = useState(
        ['adult', 'child', 'infant']
    )
    const [paxType, setPaxType] = useState()
    const [activityNames, setActivityNames] = useState([])
    const [activityName, setActivityName] = useState()
    const [checkAll, setCheckAll] = useState(false)
    const [checkedList, setcheckedList] = useState([])
    // const [indeterminate, setIndeterminate] = useState(true)
    const CheckboxGroup = Checkbox.Group;
    const CheckParams = props.params
    const { history } = props

    const removeCriteria = async () => {
        await DeleteCriteria(CheckParams.id)
        alert("Remove Success")
        history.push("/")
    }

    const onChange = checkedList => {
        setCheckAll(checkedList.length === paxTypes.length)
        setcheckedList(checkedList)
    }
    const onCheckAllChange = e => {
        if (e.target.checked) {
            setcheckedList(paxTypes)
        } else {
            setcheckedList([])
        }
        setCheckAll(e.target.checked)
    }
    useEffect(() => {
        const fetchData = async id => {
            const paxtype = await GetPaxType()
            const { data } = await GetCriteria(id)
            console.log(data)
            setName(data.name)
            setDestinations(data.destinations)
            SetCountries(data.countries)
            setActivityNames(data.activityNames)
            // setCheckAll(data.checkAll)
            setcheckedList(data.paxTypes)

            setCheckAll(data.paxTypes.length === paxtype.data.length)
            // console.log(data.paxTypes.length)
            // console.log(paxtype)

            // setCountry(data.country)
            // setPaxTypes(data.paxTypes)
            // setPaxType(data.paxType)
            // setCheckAll(data.paxTypes)
            // setActivityName(data.activityName)
        }
        if (CheckParams.id) {
            fetchData(CheckParams.id)
        }
    }, [CheckParams.id])
    return (
        <React.Fragment>
            <FormContainer>
                <div className="col-md-12">
                    {CheckParams.id && <h1>Edit Criteria</h1>}
                    {!CheckParams.id && <h1>Create Criteria</h1>}
                </div>
                <Formik
                    initialValues={{
                        name,
                        destinations,
                        // destination,
                        countries,
                        // country,
                        paxTypes,
                        // paxType,
                        checkedList,
                        activityNames,
                        // activityName,
                    }}
                    enableReinitialize={true}
                    validate={ValidateSchema}
                    onSubmit={async formValues => {
                        let data = {
                            name: formValues.name,
                            destinations: [formValues.destinations],
                            countries: [formValues.countries],
                            paxTypes: checkedList,
                            activityNames: [`${formValues.activityNames}`]
                            // activityNames: [`%${formValues.activityNames}%`]
                        }
                        if (CheckParams.id) {
                            data = {
                                ...data,
                                id: CheckParams.id,
                                destination: formValues.destination,
                                country: formValues.country,
                                paxType: formValues.paxType,
                                activityName: formValues.activityName,
                            }
                            const responseUpdate = await UpdateCriteria(data)
                            alert("Update Success")
                            console.log(responseUpdate)
                        } else {
                            const responseCreate = await CriteriaCreate(data)
                            alert("Create Success")
                            console.log(responseCreate)
                        }
                        history.push('/')
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <Titlesub>Type of Pax</Titlesub>
                                    <Checkbox
                                        onChange={onCheckAllChange}
                                        checked={checkAll}
                                    >
                                        Check all
                                    </Checkbox>
                                    <CheckboxGroup
                                        options={paxTypes}
                                        value={checkedList}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <Titlesub>Name</Titlesub>
                                    <Field
                                        name="name"
                                        component={FieldInput}
                                        value={props.values.name}
                                        onChange={props.handleChange}
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Titlesub>Destinations</Titlesub>
                                    <Field
                                        name="destinations"
                                        component={FieldInput}
                                        value={props.values.destinations}
                                        onChange={props.handleChange}
                                        placeholder="Destinations"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Titlesub>Country Code</Titlesub>
                                    <Field
                                        name="countries"
                                        component={FieldInput}
                                        value={props.values.countries}
                                        onChange={props.handleChange}
                                        placeholder="Country code"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <Titlesub>Activity Name (Ex. %Destiny%)</Titlesub>
                                    <Field
                                        name="activityNames"
                                        component={FieldInputArea}
                                        value={props.values.activityNames}
                                        onChange={props.handleChange}
                                        placeholder="Activity Names"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <ContainerButton>
                                        {CheckParams && <Button type="danger" onClick={() => removeCriteria(CheckParams.id)}>
                                            {/* {CheckParams.id && <Button type="danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) DeleteCriteria(CheckParams.id) }}> */}
                                            Remove
                            </Button>}
                                        <Button type="primary" htmlType="submit">
                                            Save
                            </Button>
                                    </ContainerButton>
                                </div>
                            </div>
                        </form>
                    )}
                />
            </FormContainer>
        </React.Fragment>
    )
}

const ContainerButton = styled.div`
  display: flex;
  margin-top: 1rem;
  float: right;
`
const FormContainer = styled.div`
  background: #d6f4fd;
  padding: 5rem;
`
const Titlesub = styled.div`
 margin-top: 1rem;
`