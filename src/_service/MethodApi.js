import axios from 'axios'
import { EPROTONOSUPPORT } from 'constants';

const base_url = 'http://travizgo.dosetech.co:7799'

// Fare API

//getFare All
export const GetFareAll = async () => {
    return await axios
    .get(base_url + '/fare/all')
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
    .post(base_url + '/fare/list', body)
    .then(reponse => {
        return reponse
    })
    .catch(error => {
        return error
    })
}

// Get MarkupType 
export const GetMarkUpType = async () => {
    return await axios
    .get(base_url + '/fare/markupType')
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

// create Fare
export const CreateFare = data => {
    return axios 
    .post(base_url + '/fare', data)
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
    .put(base_url + '/fare', body)
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
    .delete(base_url + `/fare/${id}`)
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
      .get(base_url + '/criteria/all')
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
      .get(base_url + `/criteria/${id}`)
      .then(response => {
          return response
      })
      .catch(error => {
          return error
      })
  }
  // GetList Criteria 
 export const GetListCriteria = async () => {
     const body = {
         name: "",
         page: 1,
         itemPerPage: 5,
     }
     return await axios
     .post(base_url + '/criteria/list' , body)
     .then(response => {
         return response
     })
     .catch(error => {
         return error
     })
 }
// GetList Search Criteria
export const GetSearchCriteria = async keyword => {
    const body = {
        name: keyword,
        page: 1,
        itemPerPage: 5,
    }
    return await axios
    .post(base_url + '/criteria/list', body)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}
//Create Criteria
export const CriteriaCreate = data => {
    return axios
    .post(base_url + '/criteria', data)
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
    .put(base_url + '/criteria', body)
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
    .delete(base_url + `/criteria/${id}`)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

// API MARK UP RULE

// Get MarkupRule All
export const GetAllMarkUpRule = async () => {
    return axios
    .get(base_url + '/markupRule/all')
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}
// Get MarkupRule with params
export const GetMarkupRule = async id => {
    return axios
    .get(base_url + `/markupRule/${id}`)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

// GetMarkupRule List 

export const GetListMarkupRule = async keyword => {
    const body  = {
        name: keyword,
        page: '1',
        itemPerPage: 5
    }
    return axios
    .post(base_url + '/markuprule/list', body)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

// Create MarkupRule

export const CreateMarkupRule = data => {
    return axios
    .post(base_url + '/markupRule', data)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

// Update Markuprule
export const UpdateMarkUpRule = data => {
    return axios
    .put(base_url + '/markupRule', data)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

// Delete MarkUpRule

export const DeleteMarkUpRule = async id => {
    return axios
    .delete(base_url + `/markupRule/${id}`)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

// Booking API

// Get Booking List
export const GetBookingList = async () => {
    const body  = {
        holderName: "",
        page: '1',
        itemPerPage: 5
    }
    return axios
    .post(base_url + '/booking/list', body)
    .then(response => {
        console.log(response)
        return response
    })
    .catch(error => {
        return error
    })
}
// Get Search
export const GetSearch = async keyword => {
    const body  = {
        holderName: keyword,
        page: '1',
        itemPerPage: 5
    }
    return axios
    .post(base_url + '/booking/list', body)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

// Get Booking Detail

export const GetBookingDetail = async id => {
    return axios 
    .get(base_url + `/booking/${id}`)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}

// Cancel Booking
export const CancelBooking = async id => {
    return axios
    .get(base_url + `/booking/${id}`)
    .then(response => {
        return response
    })
    .catch(error => {
        return error
    })
}
