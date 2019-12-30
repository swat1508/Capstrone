import React, { useState } from 'react';
import { Link} from "react-router-dom";
import axios ,{baseURL}from '../../config/axios';

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

export default ({history}) => {
    const validEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
    const validPassRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    const [formData, setFormData] = useState({ username: '', password: '',confirmpassword:'',userimage:null});
    const [resError, setResError] = useState('');
    const [errors, setError] = useState({ username: '', password: '',confirmpassword:''});

   const userRegistration=(event)=> {
        event.preventDefault();
        const {username,password,confirmpassword}=formData;
        if(username && password && confirmpassword) {
            if(validateForm(errors)){
                const formObj = new FormData();
                for ( const key in formData ) {
                    formObj.append(key, formData[key]);
                }
                axios.post(baseURL+"/auth/register",formObj,{
                   headers: {
                     'content-type': 'multipart/form-data' // do not forget this 
                 }
            }).then(
                    (res) => {
                        if(res){
                        setResError("");
                        history.push("/login");
                        }
                    },
                    (error) => {
                        setResError(error.message);
                    }
                )
            }
        }
        else{
            setError({username:"Please provide the Email Address"
            ,password:"Please provide the password",
            confirmpassword:"Please provide the password"});
          }
    }
    const handleChange=(event)=>{
        event.preventDefault();
        const { name, value } = event.target,errObj={},dataObj={};
        dataObj[name]=value;
        switch (name) {
            case 'username': 
                errObj[name] = validEmailRegex.test(value) ? '': 'Email is not valid!';
                break;
            case 'password':
                errObj[name]=validPassRegex.test(value)? '': 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'; 
                break;
            case 'confirmpassword':
                errObj[name] = value!==formData.password? 'Password does not match':'';
                break;
            case "userimage":
                dataObj[name]=event.target.files[0];
                break;
          default:
            break;
        }
        setError(prevState => {return { ...prevState,...errObj}});
        setFormData(prevState => {return { ...prevState,...dataObj}});
    }
    // Atleast one retrun should be there
    return (
        <div className="register-page my-5 col-sm-4 mx-auto">
            <div className="form">
                <div className="title">
                    Register
                </div>
                {resError ? (<div className="form-line text-danger p-2 m-1 w-100">{resError}</div>) : ( <div></div>)}
                <div className="mt-2" >
                    <form className="register-form" autoComplete="off" onSubmit={e=>userRegistration(e)} noValidate>
                        <div className='username'>
                            <label className="d-none" htmlFor="username">userName</label>
                            <input type='text' name='username' onChange={e=>handleChange(e)}  noValidate  placeholder="Email Address"/>
                            {errors.username.length > 0 && 
                                <div className="py-2 text-left">
                                    <span className='error'>{errors.username}</span>
                                </div>}
                        </div>
                        <div className='password mt-3'>
                            <label className="d-none" htmlFor="password">Password</label>
                            <input type='password' name='password' onChange={e=>handleChange(e)}  noValidate placeholder="Password"/>
                            {errors.password.length > 0 && <div className="py-2 text-left">
                                    <span className='error'>{errors.password}</span>
                                </div>}
                        </div>
                        <div className='confirmpassword mt-3'>
                            <label className="d-none" htmlFor="confirmpassword">Password</label>
                            <input type='password' name='confirmpassword' onChange={e=>handleChange(e)}  noValidate placeholder="Confirm Password"/>
                            {errors.confirmpassword.length > 0 && <div className="py-2 text-left">
                                    <span className='error'>{errors.confirmpassword}</span>
                                </div>}
                        </div>
                        <div className='user-image mt-3'>
                            <label className="d-none" htmlFor="userimage">User Image</label>
                            <input type="file" className="form-control-file" name="userimage" id="userimage" onChange={e=> handleChange(e)}/>
                        </div>
                        <button type="submit" className="mt-3">create</button>
                        <p className="message">Already registered? <Link to="/login"  id="signin">Sign In</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}