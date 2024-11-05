import React from 'react'

const Search = () => {
    return (
        <div className="mx-3 xl:w-96">
            <div className="relative flex flex-wrap items-stretch w-full px-3 py-2 bg-white border rounded-md">
                {/* <!--Search icon--> */}
                <span
                    className="input-group-text flex items-center whitespace-nowrap border-0 rounded  py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="grey"
                        className="w-5 h-5 ">
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd" />
                    </svg>
                </span>
                <input
                    type="search"
                    className="relative m-0 block flex-auto rounded focus:border-0 border-0  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out   focus:outline-none focus:ring-0 "
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2" />
  
                
            </div>
        </div>
    );
}

export default Search