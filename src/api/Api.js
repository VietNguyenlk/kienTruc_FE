import axios from "axios";

var api = axios.create({
    baseURL: "http://localhost:3001/api/monhoc",
});

var apiLHP    = axios.create({
    baseURL: "http://localhost:3001/api/lophocphan",
});

var apiUser = axios.create({
    baseURL: "http://localhost:3001/api/user",
});

export const getApiUser = (url, data) => {
    return apiUser.get(url, data);
}

export const postApiUser = (url, data) => {
    return apiUser.post(url, data);
}

export const getApiNoneToken = (url, data) => {
    return api.get(url, data);
}
export const postApiNoneToken = (url, data) => {    
    return api.post(url, data);
}

export const getApiLHP = (url, data) => {
    return apiLHP.get(url, data);
}
export const postApiLHP = (url, data) => {
    return apiLHP.post(url, data);
}