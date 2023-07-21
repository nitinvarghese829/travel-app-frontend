import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function DestinationCreate() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const handleSubmit = async (e) => {
      e.preventDefault();
      const {data} = await axios.post('/admin/destination/create', {name: name});

      if(data){
          navigate('/dashboard/destinations/list');
      }
    }

    return (
        <div>
            <h1 className={'text-2xl bold'}>Create Destination</h1>
            <form className={'my-8'} onSubmit={handleSubmit}>
                <div className={'py-2'}>
                    <label>Destination Name</label>
                    <input className={'input'} type={'text'} placeholder={''} value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>

                <div className={'py-2'}>
                    <button className={'bg-primary text-white px-3 py-2 rounded-2xl'} type={'submit'}>Submit</button>
                </div>

            </form>
        </div>
    )
}
