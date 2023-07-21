import React, {useEffect, useState} from 'react'
import axios from "axios";
import Pagination from "../../../components/Pagination.jsx";

export default function DestinationList() {
    const [destinations, setDestinations] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [destLoading, setDestLoading] = useState(false);
    const [pages, setPages] = useState([]);
    const getAllDestinations = async (currentPage) => {

        const {data} = await axios.post('/admin/destination/list', {
            currentPage: currentPage ? currentPage : 1,
        });

        setDestinations(data.destinations);
        setCurrentPage(data.currentPage);

        setDestLoading(false);

        const pageArray = [];
        for (let i = 1; i <= data.totalPages; i++) {
            pageArray.push(i);
        }
        setPages(pageArray);
    }



    useEffect(() => {
        getAllDestinations(currentPage);
    }, [])

    const onPageChange = (page) => {
        console.log(page)
        setCurrentPage(page);
        getAllDestinations(page);
    };

    return (
        <div>
            <h1 className={'text-2xl'}>Category List</h1>
            <div className="relative border rounded-xl overflow-auto my-8">
                <div className="shadow-sm overflow-hidden my-4">
                    <table className="border-collapse table-auto w-full text-sm">
                        <thead>
                        <tr>
                            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                            {destinations.map((destination, index) =>
                                <tr key={index}>
                                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                        {destination.name}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        pages={pages}
                    />
                </div>
            </div>
        </div>
    )
}
