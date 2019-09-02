// import * as Yup from 'yup'


// export const ValidateSchema = Yup.object().shape({
//     from: Yup.string().required('Required'),
//     to: Yup.string().required('Required'),
//     type: Yup.string().required('Required'),
//     number: Yup.string().required('Required'),
//     name: Yup.string().required('Required'),
//     destinations: Yup.string().required('Required'),
//     countries: Yup.string().required('Required'),
//     paxTypes: Yup.array().required('Required'),
//     activityNames: Yup.string().required('Required')

    //select: yup.string().required('Select is required')
// })

// export const ValidateSchema = formValue => {
//     let errors = {};
//     const { name, destinations, countries, paxTypes, activityNames} = formValue

//     if (!name) {
//         errors.name = 'Required'
//     }
//     if (!destinations) {
//         errors.destinations = 'Required'
//     }
//     if (!countries) {
//         errors.countries = 'Required'
//     }
//     if (!paxTypes) {
//         errors.paxTypes = 'Required'
//     }
//     if (!activityNames) {
//         errors.activityNames = 'Required'
//     }

//     console.log(errors)
//     return errors
// }







// import * as Yup from 'yup'


// export const ValidateSchema = Yup.object().shape({
//     from: Yup.string().required('Required'),
//     to: Yup.string().required('Required'),
//     type: Yup.string().required('Required'),
//     number: Yup.string().required('Required'),
//     name: Yup.string().required('Required'),
//     destinations: Yup.string().required('Required'),
//     countries: Yup.string().required('Required'),
//     paxTypes: Yup.array().required('Required'),
//     activityNames: Yup.string().required('Required')

    //select: yup.string().required('Select is required')
// })

export const ValidateSchema = formValue => {
    let errors = {};
    const { name, destinations, destination, countries, country, paxTypes, activityName, activityNames} = formValue

    if (!name) {
        errors.name = 'Required Name !'
    }
    // if (!destination) {
    //     errors.destination = 'Required destination !'
    // }
    if (!destinations) {
        errors.destinations = 'Required destination !'
    }
    // if (!country) {
    //     errors.country = 'Required country !'
    // }
    if (!countries) {
        errors.countries = 'Required country !'
    }
    // if (!paxTypes) {
    //     errors.paxTypes = 'Required'
    // }
    // if (!activityName) {
    //     errors.activityName = 'Required ActivityName !'
    // }
    if (!activityNames) {
        errors.activityNames = 'Required ActivityNames !'
    }

    console.log(errors)
    return errors
}