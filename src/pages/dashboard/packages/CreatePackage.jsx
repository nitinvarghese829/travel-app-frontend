import React, {useEffect, useState} from 'react'
import axios from "axios";
import UploadPhoto from "../../../components/dashboard/UploadPhoto.jsx";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useNavigate, useParams} from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

export default function CreatePackage() {
    const [category, setCategory] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [itinerary, setItinerary] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [inclusion, setInclusion] = useState('');
    const [exclusion, setExclusion] = useState('');
    const [highlights, setHighlights] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(null);
    const [type,setType] = useState('');

    const convertArrayToObject = (arr) => {
        return arr.map(({ _id, name }) => {
            return {
                name,
                value: _id,
            };
        });
    };

    const getAllCategories = async () => {
        const {data} = await axios.get('/admin/category/list');

        setCategory(convertArrayToObject(data));
    }

    const getAllDestinations = async () => {
        const {data} = await axios.get('/admin/destination/list');

        setDestinations(convertArrayToObject(data));
    }
    const handleAddDay = (e) => {
        e.preventDefault();
        setItinerary([...itinerary, '']);
    };

    const handleItineraryChange = (index, data) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[index] = data;
        setItinerary(updatedItinerary);
    };

    const {packageType, id} = useParams();

    const fetchCurrentPackage = async (packageType) => {
        const {data} = await axios.get(`/admin/packages/fetch/${packageType}/${id}`);

        setTitle(data.title);
        setSelectedCategory(data.category._id);
        setSelectedDestination(data.destination._id);
        setAddedPhotos(data.photos);
        setItinerary(data.itinerary);
        setHighlights(data.highlights);
        setInclusion(data.inclusion);
        setExclusion(data.exclusion);
        setPrice(data.price);

    }

    useEffect(() => {
        getAllCategories();
        getAllDestinations();
        if(id){
            setType(packageType);
            fetchCurrentPackage(packageType);
        }
        if (itinerary.length === 0) {
            setItinerary(['']);
        }
        const currentUrl = window.location.href;
        const hasDomestic = currentUrl.includes('domestic');


        if (hasDomestic) {
            setType('domestic');
        } else {
            setType('international')
        }
    }, [window.location.href])



    const renderEditors = () => {
        return itinerary.map((day, index) => (
            <div className="w-full rounded-2xl my-2" key={index}>
                <CKEditor
                    editor={ClassicEditor}
                    data={day}
                    onReady={(editor) => {
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handleItineraryChange(index, data);
                        console.log({ event, editor, data });
                    }}
                />
            </div>
        ));
    };

    const navigate = useNavigate();

    console.log(type);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(addedPhotos, itinerary, selectedDestination, selectedCategory);

        const formData = {
            title,
            destination: selectedDestination,
            category: selectedCategory,
            photos: addedPhotos,
            itinerary,
            highlights,
            inclusion,
            exclusion,
            price,
            type,
            id
        }
        if(id){
            const {data} = await axios.put('admin/package/update', formData);
            if(data){
                if(type === 'domestic') {
                    navigate('/dashboard/domestic/list')
                } else {
                    navigate('/dashboard/international/list')
                }
            }
        } else {
            const {data} = await axios.post('admin/package/create', formData);
            if(data){
                if(type === 'domestic') {
                    navigate('/dashboard/domestic/list')
                } else {
                    navigate('/dashboard/international/list')
                }
            }
        }



    }





    return (
        <div>
            <>{id ? (
                <>{price ? (
                    <>
                        <h1 className={'text-2xl bold capitalize'}>Create {type} Destination</h1>
                        <form className={'my-8'} onSubmit={handleSubmit}>
                            <div className={'py-2'}>
                                <label>Title</label>
                                <input className={'input'} type={'text'} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={''} required/>
                            </div>
                            <div className={'py-2'}>
                                <label>Destination</label>
                                <div>

                                    <select className={'me-3'} name="destination" id="destination" value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)} required >
                                        <option value={''}>Select Destination</option>
                                        {destinations.map((destination, index) =>
                                            <option key={index} value={destination.value}>{destination.name}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className={'py-2'}>
                                <label>Category</label>
                                <div>
                                    <select className={'me-3'} name="category" id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                                        <option value={''}>Select Destination</option>
                                        {category.map((cat, index) =>
                                            <option key={index} value={cat.value}>{cat.name}</option>
                                        )}
                                    </select>
                                </div>

                            </div>
                            <div className={'py-2'}>
                                <label>Images</label>
                                <UploadPhoto setAddedPhotos={setAddedPhotos} addedPhotos={addedPhotos} />
                            </div>

                            <div className="py-2">
                                <label>Day wise itinerary</label>
                                <div className="">
                                    {renderEditors()}
                                    <button
                                        className="bg-primary my-2 px-3 py-2 text-nowrap text-white"
                                        onClick={handleAddDay}
                                    >
                                        Add another day
                                    </button>
                                </div>
                            </div>

                            <div className={'py-2'}>
                                <label>Highlights</label>
                                <textarea value={highlights} onChange={(e) => setHighlights(e.target.value)}/>
                            </div>

                            <div className={'py-2'}>
                                <label>Inclusion</label>
                                <textarea value={inclusion} onChange={(e) => setInclusion(e.target.value)}/>
                            </div>

                            <div className={'py-2'}>
                                <label>Exclusion</label>
                                <textarea value={exclusion} onChange={(e) => setExclusion(e.target.value)}/>
                            </div>

                            <div className={'py-2'}>
                                <label>Cost</label>
                                <input className={'input'} type={'number'} value={price} onChange={(e) => setPrice(e.target.value)} placeholder={''} required/>
                            </div>

                            <div className={'flex justify-center'}>
                                <button className={'bg-primary rounded px-3 py-2 text-white'} type={'submit'}>Save</button>
                            </div>

                        </form>
                    </>
                ) : (
                    <LoadingSpinner />
                )}</>
            ): (
                <>
                    <h1 className={'text-2xl bold capitalize'}>Create {type} Destination</h1>
                    <form className={'my-8'} onSubmit={handleSubmit}>
                        <div className={'py-2'}>
                            <label>Title</label>
                            <input className={'input'} type={'text'} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={''} required/>
                        </div>
                        <div className={'py-2'}>
                            <label>Destination</label>
                            <div>

                                <select className={'me-3'} name="destination" id="destination" value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)} required >
                                    <option value={''}>Select Destination</option>
                                    {destinations.map((destination, index) =>
                                        <option key={index} value={destination.value}>{destination.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className={'py-2'}>
                            <label>Category</label>
                            <div>
                                <select className={'me-3'} name="category" id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                                    <option value={''}>Select Destination</option>
                                    {category.map((cat, index) =>
                                        <option key={index} value={cat.value}>{cat.name}</option>
                                    )}
                                </select>
                            </div>

                        </div>
                        <div className={'py-2'}>
                            <label>Images</label>
                            <UploadPhoto setAddedPhotos={setAddedPhotos} addedPhotos={addedPhotos} />
                        </div>

                        <div className="py-2">
                            <label>Day wise itinerary</label>
                            <div className="">
                                {renderEditors()}
                                <button
                                    className="bg-primary my-2 px-3 py-2 text-nowrap text-white"
                                    onClick={handleAddDay}
                                >
                                    Add another day
                                </button>
                            </div>
                        </div>

                        <div className={'py-2'}>
                            <label>Highlights</label>
                            <textarea value={highlights} onChange={(e) => setHighlights(e.target.value)}/>
                        </div>

                        <div className={'py-2'}>
                            <label>Inclusion</label>
                            <textarea value={inclusion} onChange={(e) => setInclusion(e.target.value)}/>
                        </div>

                        <div className={'py-2'}>
                            <label>Exclusion</label>
                            <textarea value={exclusion} onChange={(e) => setExclusion(e.target.value)}/>
                        </div>

                        <div className={'py-2'}>
                            <label>Cost</label>
                            <input className={'input'} type={'number'} value={price} onChange={(e) => setPrice(e.target.value)} placeholder={''} required/>
                        </div>

                        <div className={'flex justify-center'}>
                            <button className={'bg-primary rounded px-3 py-2 text-white'} type={'submit'}>Save</button>
                        </div>

                    </form>
                </>
            )}</>

        </div>
    )
}
