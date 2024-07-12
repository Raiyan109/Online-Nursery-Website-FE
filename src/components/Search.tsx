import { useGetProductQuery } from "@/redux/features/productApi";
import { ChangeEvent, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";
import { Link } from "react-router-dom";

// type for the product item
interface Product {
    _id: string;
    title: string;
    price: number;
    image: string;
}

// type for the API response
interface ApiResponse {
    data: Product[];
}

const Search = () => {
    const [query, setQuery] = useState<string>('');
    const { data } = useGetProductQuery<ApiResponse>(undefined);


    //Our search filter function
    const searchFilter = (array: Product[]) => {
        return array.filter(
            (el: Product) => el.title.toLowerCase().includes(query.toLowerCase())
        );
    };


    const filtered = searchFilter(data?.data || []);


    //Handling the input on our search bar
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    return (
        <div>
            <div className="relative">
                <input type="text" name="q" className="w-full border h-9 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200" placeholder="Search" onChange={handleChange} />
                <button type="submit">
                    <IoSearchOutline className="text-lightGreen font-bold h-5 w-5 absolute top-2 right-3" />
                </button>
            </div>

            {/*  Search Results */}
            <div className="bg-gradient-to-r from-lime-400 to-lime-600 opacity-85 absolute top-48 md:top-20">
                {
                    query &&
                    <div className="flex flex-col divide-y divide-gray-200">
                        {
                            query && filtered.map((item: Product) => (

                                <div className="flex items-center py-4 px-6" key={item._id}>
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