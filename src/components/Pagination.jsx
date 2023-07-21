import React from 'react'

export default function Pagination({pages, currentPage, onPageChange}) {
    return (
        <div>
            <div className={'flex justify-center my-3'}>
                <nav>
                    <ul className="flex justify-center mt-4">
                        {pages.map((page) => (
                            <li
                                key={page}
                                className={`px-3 py-2 mx-1 rounded cursor-pointer ${
                                    currentPage === page ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
