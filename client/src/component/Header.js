import React, { useContext, useEffect, useState } from 'react';
import logo from '../icons/beckn-logo.svg';
import { Context } from '../Store'
import axios from 'axios';

export default function Header() {
    const [state, setstate] = useContext(Context);

    const logout = () => {
        window.open('http://localhost:8000/api/v1/auth/logout', '_self');
    }

    const getUser = async () => {
        try {
            const url = 'http://localhost:8000/api/v1/auth/login/success';
            const { data } = await axios.get(url, { withCredentials: true });
            console.log(data);
            setstate({ ...state, userInfo: { ...state.userInfo, user: data.user.user, name_org: data.user.name_org, name_role_timestamp: data.user.name_role_timestamp } });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="header">
             <img className="b-logo" src={logo} alt="React Logo" />
             <div className='user-details'>
                 {state.userInfo.user?<div className="b-padding">Name: <b>{state.userInfo.user}</b></div>:''}
                 {state.userInfo.name_org?<div className="b-padding">Organisation Name: <b>{state.userInfo.name_org}</b></div>:''}
                 {state.userInfo.name_role_timestamp?<div>Role in the network: <b>{state.userInfo.name_role_timestamp}</b></div>:''}
             </div>
        </div>
    )
}
