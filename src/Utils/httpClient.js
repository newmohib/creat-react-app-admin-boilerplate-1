import axios from 'axios';

const httpSimpleRequest = (request) => {

    axios({
        method: request.method,
        url: request.url,
        data: request.data
    })
    .then(response => {
        return response;
    }).catch(error => {
        return error;

    })
};

export {httpSimpleRequest}

