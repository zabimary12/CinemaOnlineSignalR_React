import axios from 'axios';


export default class AxiosServices {
  post(url, data, isRequiredHeader = false, header) {
    return axios.post(url, data, isRequiredHeader && header)
  }
}