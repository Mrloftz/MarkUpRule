import React, { useState } from 'react'
import { GetMarkupRule } from '../../_service/MethodApi';
import { Formik } from 'formik';

export const MarkUpRule = props => {
    const [name, setName] = useState()
    const [fareId, setFareId] = useState()
    const [criteriaId, setCriteriaId] = useState()
    const [startDateTime, setStartDateTime] = useState()
    const [endDateTime, setEndDateTime] = useState()

    const CheckParams = props.params

    useEffect(() => {
        const fetchData = async id => {
            const { data }  = await GetMarkupRule(id)
            console.log(data)
            setName(data.name)
            setDestinations(data.destination)
            SetCountries(data.country)
            setPaxTypes(data.paxType)
            setActivityNames(data.activityName)
        }
        if (CheckParams.id) {
            fetchData(CheckParams.id)
        }

    })
    return (
        <React.Fragment>
            <Formik
            initialValues={{
                name
            }}
            />
        </React.Fragment>
    )
}