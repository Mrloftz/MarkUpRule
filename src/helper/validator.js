import * as Yup from 'yup'

export const ValidateSchema = Yup.object().shape({
    from: Yup.string().required('Required'),
    to: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    number: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    destinations: Yup.string().required('Required'),
    countries: Yup.string().required('Required'),
    paxTypes: Yup.array().required('Required'),
    activityNames: Yup.string().required('Required')

    //select: yup.string().required('Select is required')
})