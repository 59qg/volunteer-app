import axios from 'axios';
import Promise from 'es6-promise';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


if (!window.Promise) {
    window.Promise = Promise;
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    Toast('网络开小差了...');
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export default function request(url, options) {
    NProgress.start();
    let headers = {};
    if (options && options.method !== 'GET') {
        headers = {
            'content-type': 'application/x-www-form-urlencoded',
        };
    }
    return axios('http://localhost:3001/appapi' + url, {...options, headers, withCredentials: true })
    .then((res) => {
        NProgress.done();
        return res
    })
    .then(checkStatus)
    .catch(err => ({ err }));
}
