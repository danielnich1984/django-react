import { status } from '../utils';

export function auth(credentials){
    return fetch('http://127.0.0.1:8000/api/authenticate/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    }).then(status).catch( e=> { console.log(e) })
}

export function register(userData){
    return fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    }).then(status).catch( e=> { console.log(e) })
}

export function uploadAvatar(profileID, data){
    return fetch(`http://127.0.0.1:8000/api/profile/${profileID}/`, {
        method: 'PUT', 
        body: data
    }).then(status).catch( e=> { console.log(e) })
}

export function changePass(userData, userID, token){
    return fetch(`http://127.0.0.1:8000/api/users/${userID}/change_password/`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(userData)
    }).then(status).catch( e=> { console.log(e) })
}