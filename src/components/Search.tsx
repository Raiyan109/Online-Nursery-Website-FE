import { useGetProductQuery } from "@/redux/features/productApi";
import { FormEvent, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState('');
    const { data, error, isLoading } = useGetProductQuery(undefined)

    if (isLoading) {
        return <div>
            <Loading />
        </div>
    }
    //Our search filter function
    const searchFilter = (array) => {
        return array.filter(
            (el) => el.title.toLowerCase().includes(query)
        )
    }

    //Applying our search filter function to our array of countries recieved from the API
    const filtered = searchFilter(data?.data)


    //Handling the input on our search bar
    const handleChange = (e: FormEvent) => {
        setQuery(e.target.value)
    }
    return (
        <div>
            <div className="relative">
                <input type="text" name="q" className="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200" placeholder="Search" onChange={handleChange} />
                <button type="submit">
                    <IoSearchOutline className="text-lightGreen font-bold h-5 w-5 absolute top-3.5 right-3" />
                </button>
            </div>

            {/*  Search Results */}
            <div className="bg-gradient-to-r from-lime-400 to-lime-600 opacity-85 absolute top-48 md:top-20">
                {
                    query &&
                    <div className="flex flex-col divide-y divide-gray-200">
                        {
                            query && filtered.map((item) => (

                                <div className="flex items-center py-4 px-6">
                                    <img className="w-16 h-16 object-cover rounded" src={item.image} alt="Product Image" />
                                    <div className="ml-3">
                                        <h3 className="text-gray-900 font-semibold">{item.title}</h3>
                                        <p className="text-gray-700 mt-1">${item.price}</p>
                                    </div>
                                    <Link to={`/${item._id}`} className="ml-auto">
                                        <button className="btn-black-square">
                                            Details
                                        </button>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Search