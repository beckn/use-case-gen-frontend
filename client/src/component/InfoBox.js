import React from 'react'
import ConstantData from '../ConstantData'
import { Button } from '@material-ui/core'
import '../App.css'

export default function InfoBox(props) {

    const InfoList = () => {
        return ConstantData.info[props.keyName].list.map(item => {
            return <div className='list-item' key={item}>
                <div className='bullet'></div>
                <div className="list-text">{item}</div>
            </div>
        })
    }

    const handleGoogleOAuth = () => {
        window.location.href = 'http://localhost:8000/api/v1/auth/google';
    }

    const handleFacebookOAuth = () => {
        window.location.href = 'http://localhost:8000/api/v1/auth/facebook';
    }

    const handleGithubOAuth = () => {
        window.location.href = 'http://localhost:8000/api/v1/auth/github';
    }

    return (
        <div className='info-box text-color'>
            <h3 className='x-ccenter'>Notes to user</h3>
            {InfoList()}

            <div className='oauth2'>
            <Button className="auth-btn" variant="outlined" onClick={handleGoogleOAuth}> 
                Continue with Google 
            </Button>
            <Button className="auth-btn" variant="outlined" onClick={handleFacebookOAuth}> 
                Continue with Facebook 
            </Button>
            <Button className="auth-btn" variant="outlined" onClick={handleGithubOAuth}> 
                Continue with Github 
            </Button>
            </div>
        </div>
    )
}
