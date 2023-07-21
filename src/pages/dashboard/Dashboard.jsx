import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../../UserContext.jsx";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import CardUser from "../../components/dashboard/CardUser.jsx";
import {CircularProgress} from "@mui/material";
import DriveEtaIcon from "@mui/icons-material/DriveEta.js";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff.js";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

export default function Dashboard() {
    const {user, setUser, userLoader} = useContext(UserContext);
    const [userCount, setUserCount] =  useState(null);
    const [domesticCount, setDomesticCount] =  useState(null);
    const [internationalCount, setInternationalCount] =  useState(null);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();



    useEffect(() => {
        setLoader(true);
        axios.get('/profile').then(({data}) => {
            console.log("data", data);
            setUser(data);
        });

        axios.get('admin/user-count').then(({data}) => {
            console.log(data);
            setUserCount(data.userCount);
            setDomesticCount(data.domesticCount);
            setInternationalCount(data.internationalCount);
            setLoader(false);
        })
    }, [])

    // useEffect(() => {
    //     if(!user && !userLoader){
    //         navigate('/login');
    //     }
    // }, [])

    // useEffect(() => {
    //     if(!user){
    //         navaigate('/');
    //     }
    // }, [])
    return (
        <div>
            {loader ? (
                <div className={'w-full h-screen flex justify-center items-center'}>
                    <CircularProgress />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                    <Link to={'/'}>
                        <CardUser
                            count={userCount}
                            icon={
                                <GroupOutlinedIcon color={'primary'}/>
                            }
                            title={'Total Users'}
                        />
                    </Link>


                    <Link to={'/dashboard/packages/list'}>
                        <CardUser
                            count={domesticCount}
                            icon={
                                <DriveEtaIcon color={'primary'} />
                            }
                            title={'Total Domestic Packages'}
                        />
                    </Link>


                    <Link to={'/dashboard/international/list'}>
                        <CardUser
                            count={internationalCount}
                            icon={
                                <FlightTakeoffIcon color={'primary'} />
                            }
                            title={'Total International Packages'}
                        />
                    </Link>

                </div>
            )}

        </div>
    )
}
