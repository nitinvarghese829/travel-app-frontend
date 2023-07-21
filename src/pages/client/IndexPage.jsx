import React, {useContext} from 'react'
import {UserContext} from "../../UserContext.jsx";
import {useNavigate} from "react-router-dom";

export default function IndexPage() {
    const {user} = useContext(UserContext);

    const navigate = useNavigate();

    if(user?.role.includes('ROLE_ADMIN')){
        navigate('/dashboard');
    } else {
        navigate('/');
    }

    return (
        <div>IndexPage</div>
    )
}
