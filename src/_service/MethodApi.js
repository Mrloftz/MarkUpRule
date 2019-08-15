import axios from 'axios'

const base_url = 'http://travizgo.dosetech.co:7799'

// Fare API

//getFare All
export const GetFareAll = async () => {
    return await axios
    .get(base_url + '/fare/getAll')
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
    .get(base_url + `/fare/get/${id}`)
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
    .post(base_url + '/fare/getList', body)
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
    .get(base_url + `/fare/delete/${id}`)
    .then(response => {
        return response
    })
    .catch(response => {
        return response
    })
}

// Criteria API

//Get ALL
export const GetCriteriaAll = async () => {
    return await axios
      .get(base_url + '/criteria/getAll')
      .then(response => {
        return response
      })
      .catch(error => {
        return error
      })
  }
//Get with params
  export const GetCriteria = async id => {
      return await axios 
      .get(base_url + `/criteria/get/${id}`)
      .then(response => {
          return response
      })
      .catch(error => {
          return error
      })
  }
// GetList Criteria
export const GetListCriteria = async keyword => {
    const body = {
        name: keyword,
        page: 1,
        itemPerPage: 5,
    }
    return await axios
    .post(base_url + '/criteria/getList', body)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}
//Create Criteria
export const CreateCriteria = data => {
    return axios
    .post(base_url + '/criteria/create', data)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}
//update Criteria
export const UpdateCriteria = body => {
    return axios 
    .post(base_url + '/criteria/update', body)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}
//Delete Criteria
export const DeleteCriteria = async id => {
    return axios
    .post(base_url + `/criteria/delete/${id}`)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}
