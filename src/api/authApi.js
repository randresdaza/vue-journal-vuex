import axios from 'axios';

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyB3oOtpelAcWkR5_059uczU3mAFt6Zyowk'
    }
})

// console.log(process.env.NODE_ENV); // TEST durante testing

export default authApi