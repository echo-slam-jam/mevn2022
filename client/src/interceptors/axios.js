
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;

        const {status, data} = await axios.post('users/refresh', {}, {
            withCredentials: true
        });

        if (status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
            console.log(error.response.request.responseURL)
            return axios(error.response.request.responseURL);
        }
    }
    refresh = false;
    return error;
});