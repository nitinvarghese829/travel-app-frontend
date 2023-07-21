import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const {data} = await axios.post('/register', {name, email, password});

        if(data){
            navigate('/login');
        }
    }


    return (
        <div className={'flex flex-col justify-center items-center w-full h-screen'}>
            <h1 className={'text-2xl my-4'}>Register</h1>
            <div className={'shadow bg-gray-100 rounded-2xl max-w-xs'}>
                <div>
                    <img className={'rounded-t-lg'} src={'https://preview.colorlib.com/theme/bootstrap/login-form-15/images/bg-1.jpg.webp'} />
                </div>
                <form className={'py-4 px-8'} onSubmit={handleRegister}>
                    <div>
                        <label className={'text-sm ps-2'}>Name</label>
                        <input className={'input'} type={'text'} placeholder={'John Doe'} value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div>
                        <label className={'text-sm ps-2'}>Email</label>
                        <input className={'input'} type={'email'} placeholder={'john@abc.com'}  value={email} onChange={(e) => setEmail(e.target.value)}  required/>
                    </div>
                    <div>
                        <label className={'text-sm ps-2'}>Password</label>
                        <input className={'input'} type={'password'} placeholder={'****'}  value={password} onChange={(e) => setPassword(e.target.value)}  required/>
                    </div>
                    <div className={'mt-4 flex justify-center'}>
                        <button className={'bg-primary text-white px-5 py-3 rounded-2xl'} type={'submit'}>Sign In</button>
                    </div>
                    <div className={'text-center'}>
                    <span>Already have an account?
                        <Link to={'/login'}> Login</Link>
                    </span>
                    </div>
                </form>


            </div>
        </div>
    )
}
