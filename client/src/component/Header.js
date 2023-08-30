import React, { useContext, useEffect } from 'react';
import logo from '../icons/beckn-logo.svg';
import { Context } from '../Store';
import axios from 'axios';
import {useHistory,Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';


export default function Header() {
    const [state, setstate] = useContext(Context);
    const history = useHistory();
    const getUser = async () => {
		try {
            const url = `${process.env.REACT_APP_API_URL}/login/success`;
			const { data } = (await axios.get(url, { withCredentials: true }));
            console.log(data);
			
            setstate({ ...state, userInfo: { ...state ,user : data.user.displayName } });
          
		} catch (err) {
			console.log(err);
		}
	};
    
    const Login = () =>{
        window.open(`http://localhost:3000/login`, "_self");
       
    }

    const logOut = async()=>{
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
    }

    useEffect(()=>{
        getUser();
    },[]);

    return (
        <div className="header" style={{height:"auto"}}>
             <img className="b-logo" src={logo} alt="React Logo" />
             <div style={{display:"flex",gap:"3rem",alignItems:'center'}}>
             <div className='user-details'>
                 {state.userInfo.user?<div className="b-padding">Name: <b>{state.userInfo.user}</b></div>:''}
                 {state.userInfo.name_org?<div className="b-padding">Organisation Name: <b>{state.userInfo.name_org}</b></div>:''}
                 {state.userInfo.name_role_timestamp?<div>Role in the network: <b>{state.userInfo.name_role_timestamp}</b></div>:''}
             </div>
             { state.userInfo.user ? <Button variant="contained" type='button' onClick={logOut} > logout </Button> : <Button variant="contained" type='button' onClick={ Login } > Login </Button>}
             </div>
        </div>
    )
}
