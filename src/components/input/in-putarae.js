import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
const { TextArea } = Input;
const FieldInputArea = ({
    field,
    form: { touched, errors },
    ...rest
}) => {
    const error = (touched[field.name] && errors[field.name]) || errors[field.name] ? 1 : 0
    return (
        <React.Fragment>
            <InputWrapper {...field} {...rest} error={error} autosize={{ minRows:3}}/>
            <ErrorText>{(touched[field.name] && errors[field.name]) || errors[field.name]}</ErrorText>
        </React.Fragment>
    )
}

export { FieldInputArea }

const ErrorText = styled.div`
color: red;
font-size: 20px;
`

const InputWrapper = styled(TextArea)`
&.ant-input {
  border: ${props => (props.error ? '1px solid red' : '1px solid #d9d9d9')};
}
`