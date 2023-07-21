import React, {useEffect, useState} from 'react'
import axios from "axios";
import Pagination from "../../../components/Pagination.jsx";
import {CircularProgress} from "@mui/material";

export default function CategoryList() {
    const [category, setCategory] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [catLoading, setCatLoading] = useState(false);
    const [pages, setPages] = useState([]);
    const getAllCategories = async (currentPage) => {
        setCatLoading(true);
        const { data } = await axios.post('/admin/category/list', {
            currentPage: currentPage ? currentPage : 1,
        });

        setCategory(data.categories);
        setCurrentPage(data.currentPage);

        setCatLoading(false);

        const pageArray = [];
        for (let i = 1; i <= data.totalPages; i++) {
            pageArray.push(i);
        }
        setPages(pageArray);

    }

    useEffect(() => {
        getAllCategories(currentPage);
    }, [])

    const onPageChange = (page) => {
        setCurrentPage(page);
        getAllCategories(page);
        // Implement logic to fetch data for the selected page
        // For example, you can make an API call passing the page number
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
                        <>
                            {catLoading ? (
                                <div className={'flex my-8 bg-transparent justify-center'}>
                                    <CircularProgress size={24}/>
                                </div>
                            ) : (
                                <>
                                    {category.map((cat, index) =>
                                        <tr key={index}>
                                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                                {cat.name}
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </>
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
