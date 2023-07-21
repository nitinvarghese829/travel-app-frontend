import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import {BASE_URL} from "../../../services/helper.jsx";

export default function ListPackages() {
    const [packages, setPackages] = useState([]);
    const [type, setType] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get('search');

    console.log(searchValue)


    const getAllDomesticPackages = async (text) => {
        console.log('check');
      const {data} = await axios.get(`/admin/${text}/packages/all`)
        setPackages(data);
    }

    const fetchPackages = async (text) => {
        console.log('check',  text);
        if(text === ''){
            text = 'all';
        }
      const {data} = await axios.get(`/admin/packages/${text}`)
        setPackages(data);
    }
    useEffect(() => {
        const currentUrl = window.location.href;
        const hasDomestic = currentUrl.includes('domestic');

        if(searchValue !== null){
            fetchPackages(searchValue);
        } else {
            if (hasDomestic) {
                setType('domestic');
                getAllDomesticPackages('domestic');
            } else {
                setType('international')
                getAllDomesticPackages('international');
            }
        }

    }, [window.location.href])

    return (
        <div>
            {packages.map((pack, index) => {
                const url = '/dashboard/'+type+'/edit/'+pack._id;
                return(
                    <Link to={url} key={index}>
                        <div className={'grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-2 py-2 px-3 my-4 rounded-2xl drop-shadow-2xl shadow'}>
                            <div className={'w-full h-45'}>
                                <img className={'object-cover w-full h-full rounded-2xl'}
                                     src={`${BASE_URL}/uploads/` + pack.photos[0]} alt={'cover'}/>
                            </div>
                            <div className={'p-3 flex justify-center flex-col'}>
                                <h1 className={'text-2xl bold'}>{pack.title}</h1>
                                <h2 className={'bg-red w-32 text-center text-white rounded-2xl px-4 py-2 my-2'}>{pack.itinerary.length - 1}N/{pack.itinerary.length}D</h2>
                                <h3>{pack.destination.name}</h3>
                                <h3>{pack.category.name}</h3>
                            </div>
                            <div className={'flex justify-center md:justify-end items-center'}>
                                <div
                                    className={'bg-secondary text-white px-3 py-2 rounded text-2xl'}>₹ {pack.price.toFixed(2)}</div>
                            </div>
                        </div>
                    </Link>

                )
            })}

        </div>
    )
}
