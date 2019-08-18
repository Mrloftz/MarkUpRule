import React, { useState, useEffect } from 'react'
import { Formik, Field } from 'formik'
import { FieldInput, FieldCheckboxInput } from '../../components/input'
import { ValidateSchema } from '../../helper/validator'
import styled from 'styled-components'
import { GetCriteria, DeleteCriteria, UpdateCriteria, CriteriaCreate } from '../../_service/MethodApi';
import { Button } from 'antd'

export const CriteriaComponent = props => {
    const [name, setName] = useState()
    const [destinations, setDestinations] = useState()
    const [countries, SetCountries] = useState()
    const [paxTypesMap, setPaxTypesMap] = useState([{ id: 0, label: 'adult', value: 0, }, { id: 1, label: 'child', value: '1' }, { id: 2, label: 'infant', value: 2 }])
    const [paxTypes, setPaxTypes] = useState(paxTypesMap)
    const [activityNames, setActivityNames] = useState('%%')

    const CheckParams = props.params
    console.log(CheckParams)
    const { history } = props

    useEffect(() => {
        const fetchData = async id => {
            const { data }  = await GetCriteria(id)
            console.log(data)
            setName(data.name)
            setDestinations(data.destination)
            SetCountries(data.country)
            setPaxTypes(data.paxType.label)
            setActivityNames(data.activityName)
        }
        if (CheckParams.id) {
            fetchData(CheckParams.id)
        }

    },[CheckParams.id])

    return (
        <React.Fragment>
            <FormContainer>
                <h1>Criteria</h1>
                <Formik
                    initialValues={{
                        name,
                        destinations,
                        countries,
                        paxTypes,
                        activityNames,
                    }}
                    enableReinitialize={true}
                    validate={ValidateSchema}
                    onSubmit={async formValues => {
                        let data = {
                            name: formValues.name,
                            destinations: formValues.destinations,
                            countries: formValues.countries,
                            paxTypes: formValues.paxTypes,
                            activityNames: formValues.activityNames
                        }
                        if (CheckParams.id) {
                            const responseUpdate =  await UpdateCriteria(data)
                            console.log(responseUpdate)
                        } else {
                            const responseCreate = await CriteriaCreate(data)
                            console.log(responseCreate)
                        }
                        history.push('/')
                    }}
                    render={props => (
                        <form onSubmit={props.handleSubmit}>
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
                            <Titlesub>Type of Pax</Titlesub>
                            <Field
                                name="paxTypes"
                                component={FieldCheckboxInput}
                                value={props.values.paxTypes}
                                onChange={props.handleChange}
                                data={paxTypesMap}
                            />
                            <Titlesub>Activity Name</Titlesub>
                            <Field
                                name="activityNames"
                                component={FieldInput}
                                value={props.values.activityNames}
                                onChange={props.handleChange}
                                placeholder="Activity Names"
                            />
                            <ContainerButton>
                                <Button type="danger" onCick={() => DeleteCriteria(CheckParams.id)}>
                                    Remove
                            </Button>
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