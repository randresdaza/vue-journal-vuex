import axios from 'axios';

const journalApi = axios.create({
    baseURL: 'https://vue-demos-33fb2-default-rtdb.firebaseio.com'
})

journalApi.interceptors.request.use((config) => {

    config.params = {
        auth: localStorage.getItem('idToken')
    }

    // config.headers = {
    //     authorization: 'bearer idToken'
    // }

    return config
})

// console.log(process.env.NODE_ENV); // TEST durante testing

export default journalApi