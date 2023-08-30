import React,{useState} from 'react';
import '../LoginPage/LoginPage.css'

export default function Login(){
  const google = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`, "_self");
  };

  const github = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/github`, "_self");
  };

  const facebook = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/facebook`, "_self");
  };

  const [name,setname] = useState('');
  const [Password,setPassword] = useState('');
   return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
          <div className="image"> <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google_icon" className="icon" /></div> 
           <div className="text"><span>Google</span></div>
          </div>
          <div className="loginButton facebook" onClick={facebook}>
          <div className="image">   <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/meta-icon.png" alt="Facebook_icon" className="icon" /></div>
          <div className="text">   <span>Facebook</span></div>
          </div>
          <div className="loginButton github" onClick={github}>
          <div className="image">   <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="github_icon" className="icon" /></div>
          <div className="text"> <span>Github</span></div>
          </div>
        </div>
        <div className="right">
          <form>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

