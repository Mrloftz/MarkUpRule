import React, { useState, useEffect } from 'react'
import { Formik, Field } from 'formik'
import { FieldInput } from '../../components/input'
import { ValidateSchema } from '../../helper/validator'
import styled from 'styled-components'
import { GetCriteria, DeleteCriteria, UpdateCriteria, CriteriaCreate } from '../../_service/MethodApi';
import { Button, Checkbox } from 'antd'
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
    const {history} = props
    console.log(history)

    // const removeCriteria = async () => {
    //     alert("Remove Success")
    //     // await DeleteCriteria(CheckParams)
    //     history.push("/")
    // }

    const onChange = checkedList => {
        setCheckAll(checkedList.length === paxTypes.length)
        setcheckedList(checkedList)
        console.log(checkedList)
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
            const { data } = await GetCriteria(id)
            console.log(data)
            setName(data.name)
            setDestinations(data.destinations)
            SetCountries(data.countries)
            setActivityNames(data.activityNames)
            setCheckAll(data.checkAll)
            setcheckedList(data.paxTypes)
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
                <h1>Criteria</h1>
                <Formik
                    initialValues={{
                        name,
                        destinations,
                        destination,
                        countries,
                        country,
                        paxTypes,
                        paxType,
                        checkedList,
                        activityNames,
                        activityName,
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
                            alert("Update Success")
                            const responseUpdate = await UpdateCriteria(data)
                            console.log(responseUpdate)
                        } else {
                            alert("Create Success")
                            const responseCreate = await CriteriaCreate(data)
                            console.log(responseCreate)
                        }
                        history.push('/')
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>
                            <Titlesub>Type of Pax</Titlesub>
                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                <Checkbox
                                    onChange={onCheckAllChange}
                                    checked={checkAll}
                                >
                                    Check all
                            </Checkbox>
                            </div>
                            <CheckboxGroup
                                options={paxTypes}
                                value={checkedList}
                                onChange={onChange}
                            />
                            <Titlesub>Name</Titlesub>
                            <Field
                                name="name"
                                component={FieldInput}
                                value={props.values.name}
                                onChange={props.handleChange}
                                placeholder="Name"
                            />
                            <Titlesub>Destinations</Titlesub>
                            <Field
                                name="destinations"
                                component={FieldInput}
                                value={props.values.destinations}
                                onChange={props.handleChange}
                                placeholder="Destinations"
                            />
                            <Titlesub>Country Code</Titlesub>
                            <Field
                                name="countries"
                                component={FieldInput}
                                value={props.values.countries}
                                onChange={props.handleChange}
                                placeholder="Country code"
                            />
                            <Titlesub>Activity Name (Ex. %Destiny%)</Titlesub>
                            <Field
                                name="activityNames"
                                component={FieldInput}
                                value={props.values.activityNames}
                                onChange={props.handleChange}
                                placeholder="Activity Names"
                            />
                            <ContainerButton>
                            {/* {CheckParams && <Button type="danger" onClick={removeCriteria()}> */}
                                {CheckParams.id && <Button type="danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) DeleteCriteria(CheckParams.id)} }>
                                    Remove
                            </Button>}
                                
                                <Button type="primary" htmlType="submit">
                                    Save
                            </Button>
                            </ContainerButton>

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
`
const FormContainer = styled.div`
  background: #d6f4fd;
  padding: 2rem;
`
const Titlesub = styled.div`
 margin-top: 1rem;
`