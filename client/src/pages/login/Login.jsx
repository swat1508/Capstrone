import React, { useState} from 'react';
import { Link} from "react-router-dom";
import axios ,{baseURL}from '../../config/axios';

function validateForm(errors) {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export default ({location,history}) => {
const retuenUrl=location.state?location.state.referer:"/";
const validEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const validPassRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
const [formData, setFormData] = useState({ username: '', password: ''});
const [resError, setResError] = useState('');
const [errors, setError] = useState({ username: '', password: ''});

const getUserLoggedin=(event)=>{
    event.preventDefault();
    const {username,password}=formData;
    if(username && password) {
        if(validateForm(errors)){
            axios.post(baseURL+"/auth/login",{username,password}).then(
                (res) => {
                    if(res.data){
                        localStorage.setItem("currentUser",JSON.stringify(res.data))
                        setResError("");
                        history.push(retuenUrl);
                    }
                },
                (error) => {
                    setResError(error.message);
                }
            )
        }
    }
    else{
        setError({username:"Please provide the Email Address",password:"Please provide the password"});
    }
}
    const handleChange=(event)=>{
        event.preventDefault();
        const { name, value } = event.target,errObj={},dataObj={};
        dataObj[name]=value;
        switch (name) {
            case 'username': 
                errObj[name]= validEmailRegex.test(value) ? '': 'Email is not valid!';
                break;
            case 'password':
                errObj[name]=validPassRegex.test(value)? '': 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'; 
                break;
            default:
                break;
        }
        
        setError(prevState => {return { ...prevState,...errObj}});
        setFormData(prevState => {return { ...prevState,...dataObj}});
    }
    return (
        <div className="row  my-5">
            <div className="login-page col-sm-10 mx-auto row">
                <div className="form col-sm-6">
                    <div className="title">
                        Login
                    </div>
                    {resError ? (<div className="form-line text-danger p-2 m-1 w-100">{resError}</div>) : ( <div></div>)}
                    <div className="mt-2">
                        <form className="login-form " autoComplete="off" onSubmit={e=>getUserLoggedin(e)} noValidate>
                            <div className='username'>
                                <label className="d-none" htmlFor="username">userName</label>
                                <input type='text' name='username' onChange={e=>handleChange(e)} noValidate  placeholder="Email Address"/>
                                {errors.username.length > 0 && 
                                    <div className="py-2 text-left">
                                        <span className='error'>{errors.username}</span>
                                    </div>}
                            </div>
                            <div className='password mt-3'>
                                <label className="d-none" htmlFor="password">Password</label>
                                <input type='password' name='password' onChange={e=>handleChange(e)} noValidate placeholder="Password"/>
                                {errors.password.length > 0 && <div className="py-2 text-left">
                                        <span className='error'>{errors.password}</span>
                                    </div>}
                            </div>
                            <button type="submit" className="mt-3">Login</button>
                            <p className="message">Not registered? <Link to="/register" id="registration">Create an account</Link></p>
                        </form>
                    </div>
                </div>
                <div className="social-login col-sm-6">
                    <div className="title">
                        <span> Or Sign Up With</span>
                    </div>
                    <div className="social-buttons">
                        <a className="facebook" href="/auth/facebook">Sign-In with Facebook</a>
                        <a  className="gmail mt-3" href="/auth/google">Sign-In with Google </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
