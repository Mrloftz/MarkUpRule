import * as Yup from 'yup'

export const ValidateSchema = Yup.object().shape({
    from: Yup.string().required('Required'),
    to: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    number: Yup.string().required('Required')
})