import axios from 'axios'

const base_url = 'http://travizgo.dosetech.co:7799'

//getFare All
export const GetFareAll = async () => {
    return await axios
    .post(base_url + '/fare')
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

//getFare with params
export const GetFare = async id => {
    return await axios
    .get(base_url + `/fare/${id}`)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

// getList search data in table row
export const GetList = async  keyword => {
    const body = {
        name: keyword,
        page: 1,
        itemPerPage: 5, 
    }
    return await axios
    .post(base_url + '/fare', body)
    .then(reponse => {
        return reponse
    })
    .catch(error => {
        return error
    })
}

// create Fare
export const CreateFare = data => {
    return axios 
    .post(base_url + '/fare/create', data)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

// update Fare
export const UpdateFare = body => {
    return axios
    .post(base_url + '/fare/update', body)
    .then(response => {
        return response
    })
    .catch(response => {
        return response
    })
}

// delete Fare 
export const DeleteFare = async id => {
    return await axios
    .delete(base_url + `/fare/delete/${id}`)
    .then(response => {
        return response
    })
    .catch(response => {
        return response
    })
}
