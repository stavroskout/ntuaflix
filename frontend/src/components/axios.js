import axios from 'axios';

export default axios.create({
    baseURL: '',
    validateStatus: function (status) {
        // Always return true to prevent Axios from treating any status code as an error
        return true;
      }
});