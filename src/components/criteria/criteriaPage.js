import React, { useState, useEffect } from 'react'
import { Formik, Field } from 'formik'
import { FieldInput } from '../../components/input/input'
import { ValidateSchema } from '../../helper/validator'
import styled from 'styled-components'
import { async } from 'q';
import { GetCriteria } from '../../_service/MethodApi';

export const CriteriaComponent = props => {
    const [name, setName] = useState([])
    const [destinations, setDestinations] = useState([])
    const [countries, SetCountries] = useState([])
    const [paxTypes, setPaxTypes] = useState([])
    const [activityNames, setActivityNames] = useState([])

    const CheckParams = props.params
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await GetCriteria(id)

            console.log(data)
            setName()
            setDestinations()
            SetCountries()
            setPaxTypes()
            setActivityNames()
        }
        if (CheckParams.id) {
            fetchValue(CheckParams.id)
        }
    })

    return (
        <React.Fragment>
            <FormContainer>
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
                }}
                render={props => (
                    <form onSubmit={props.handleSubmit}>
                        <div>Name</div>
                        <Field
                        name="name"
                        component={FieldInput}
                        value={props.values.name}
                        onChange={props.handleChange}
                        placeholder="Name"
                        />
                        <div>Destinations</div>
                        <Field
                        name="destinations"
                        component={FieldInput}
                        value={props.values.destinations}
                        onChange={props.handleChange}
                        placeholder="Destinations"
                        />
                        <div>Country Code</div>
                        <Field
                        name="countries"
                        component={FieldInput}
                        value={props.values.countries}
                        onChange={props.handleChange}
                        placeholder="Country code"
                        />
                        <div>Type of Pax</div>
                        <Field 
                        name="paxTypes"
                        component={FieldRadioInput}
                        value={props.values.paxTypes}
                        onChange={props.handleChange}
                        placeholder="Type of Pax"
                        />
                    </form>
                )}
                />
            </FormContainer>
        </React.Fragment>
    )
}