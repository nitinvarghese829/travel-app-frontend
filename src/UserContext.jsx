import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    const [userLoader, setUserLoader] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setUserLoader(true);
        if(!user){
            axios.get('/profile').then(({data}) => {
                console.log("data", data);
                setUser(data);
                setUserLoader(false);
            }).catch((err) =>{
                console.log(err);
                navigate('/');
                setUserLoader(false);
            });
        }

    }, [])
    return(
        <UserContext.Provider value={{user, setUser, search, setSearch, userLoader}}>
            {children}
        </UserContext.Provider>
    );
}