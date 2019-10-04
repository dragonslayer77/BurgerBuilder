import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-burger-builder-rea-71bec.firebaseio.com/'
});

export default instance;