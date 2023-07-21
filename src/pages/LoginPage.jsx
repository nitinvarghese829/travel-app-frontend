import React, {useContext, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";

export default function LoginPage() {
    const {user} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const {data} = await axios.post('/login', {email, password});

        console.log(data)
        console.log(data.role.includes('ROLE_ADMIN'))
        if(data._id){
            if(data.role.includes('ROLE_ADMIN')){

                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } else {
            console.log(data)
            if(data.message){
                setError(data.message)
            } else {
                setError(data);
            }
        }
    }

    if(user){
        if(user.role.includes('ROLE_ADMIN')){
            navigate('/dashboard');
        }
    }

    return (
        <div className={'flex flex-col justify-center items-center w-full h-screen'}>
            <h1 className={'text-2xl my-4'}>Login</h1>
            <div className={'shadow bg-gray-100 rounded-2xl max-w-xs'}>
                <div>
                    <img className={'rounded-t-lg'} src={'https://preview.colorlib.com/theme/bootstrap/login-form-15/images/bg-1.jpg.webp'} />
                </div>
                <form className={'py-4 px-8'} onSubmit={handleLogin}>
                    <div>
                        <label className={'text-sm ps-2'}>Email</label>
                        <input className={'input'} type={'email'} placeholder={'youremail@abc.com'} value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div>
                        <label className={'text-sm ps-2'}>Password</label>
                        <input className={'input'} type={'password'} placeholder={'****'}  value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    {error &&  (
                        <div className={'text-sm text-red-500'}>{error}</div>
                    )}
                    <div className={'mt-4 flex justify-center'}>
                        <button className={'bg-primary text-white px-5 py-3 rounded-2xl'} type={'submit'}>Sign In</button>
                    </div>
                    <div className={'text-center'}>
                    <span>Don't have an account?
                        <Link to={'/register'}> Register</Link>
                    </span>
                    </div>
                </form>


            </div>
        </div>
    )
}
