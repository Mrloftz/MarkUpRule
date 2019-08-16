import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
const FieldCheckboxInput = ({
    field,
    form: { touched, errors },
    data,
    ...rest
}) => {
    const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? 1 : 0
    return (
        <React.Fragment>
            <CheckboxGroup {...field}>
                {data.map((ratio, index) => {
                    return (
                        <Checkbox value={ratio.value} key={index}>
                            {ratio.label}
                        </Checkbox>
                    )
                })}
            </CheckboxGroup>
            <ErrorText>{(touched[field.name] && errors[field.name]) || errors[field.name]}</ErrorText>
            {/* <InputCheckboxWrapper {...field} {...rest} error={error}>
            {checkbox_text}
            </InputCheckboxWrapper>
            <br /> */}
        </React.Fragment>
    )
}

export { FieldCheckboxInput }

// const InputCheckboxWrapper = styled(checkbox)`
//     &.ant-input {
//         border: ${props => (props.error ? '1px solid  red': '1px solid #d9d9d9')}
//     }
// `

const ErrorText = styled.div`
    color: red;
    font-size: 20px;
`