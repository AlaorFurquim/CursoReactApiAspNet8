import React,{useState} from 'react';
import "./styles.css";
import logo from "../../assets/logo.svg";
import padlock from "../../assets/padlock.png";
import api from "../../services/api";
import { useHistory } from 'react-router-dom';

export default function Login(){

    const [userName, setUserName] = useState('');
    const [password, setPassWord] = useState(''); 

    const history = useHistory(); 

    async function login(e){
        e.preventDefault();
        const data = {
            userName,
            password,
        }

        try {
           const response = await api.post('/api/auth/v1/signin',data);

           localStorage.setItem('userName',userName);
           localStorage.setItem('accessToken',response.data.accessToken);
           localStorage.setItem('refreshToken',response.data.refreshToken);

           history.push('/books');
        } catch (error) {
            alert('Login failed! try again!');
        }
    }

    return(       
           <div className="login-container">
            <section className="form">
            <img src={logo} alt="eurudio-login"></img>
            <form onSubmit={login}>
                <h1>Acesse sua conta</h1>
                <input placeholder="Login"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                >

                </input>
                <input type="password" placeholder="Password" 
                   value={password}
                   onChange={e => setPassWord(e.target.value)}
                   ></input>

                <button className="button" type="submit">Login</button>
            </form>
            </section>
            <img src={padlock} alt="Login"></img>
           </div>
    )
}