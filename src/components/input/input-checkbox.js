import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'antd';


const FieldCheckboxInput = ({
    field,
    form: { touched, errors },
    data,
    ...rest
}) => {
  console.log(field)
    const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? 1 : 0
    return (
      <React.Fragment>
        <Checkbox.Group {...field}>
          {data.map((ratio, index) => {
            return (
              <Checkbox value={ratio.value} key={index}>
                {ratio.label}{' '}
              </Checkbox>
            )
          })}
        </Checkbox.Group>
        <ErrorText>{(touched[field.name] && errors[field.name]) || errors[field.name]}</ErrorText>
      </React.Fragment>
    )
  }

export { FieldCheckboxInput }

const ErrorText = styled.div`
    color: red;
    font-size: 20px;
`