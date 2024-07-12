import InViewAnimation from "@/components/InViewAnimation"
import InViewRight from "@/components/InViewRight"
import { useGetProductQuery } from "@/redux/features/productApi"
import AllProduct from "./AllProduct"
import Navbar from "@/components/Navbar"
import Loading from "@/components/Loading"
import Pagination from "@/components/Pagination"
import { FormEvent, useEffect, useState } from "react"
import FilterSearch from "@/components/FilterSearch"

const AllProducts = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  // States for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(10)
  const { data, error, isLoading } = useGetProductQuery(undefined)

  let filters = ["Outdoor plants", "Blooms", "Orchids", "House plants", "Pet friendly plants"];

  // Search filter
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value.toLowerCase());
  };

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters, searchText, data]);

  const filterItems = () => {
    let tempItems = data?.data || [];

    // Apply category filters
    if (selectedFilters.length > 0) {
      tempItems = tempItems.filter((item) =>
        item.category.some((cat) => selectedFilters.includes(cat))
      );
    }

    // Apply search text filter
    if (searchText) {
      tempItems = tempItems.filter((item) =>
        item.title.toLowerCase().includes(searchText)
      );
    }

    setFilteredItems(tempItems);
  };
  if (isLoading) {
    return <div>
      <Loading />
    </div>
  }
  // Logic for pagination
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentResults = filteredItems.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="py-32">
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-32">
        <InViewAnimation>
          <h1 className="text-6xl text-white font-bold pb-10 lg:px-28 px-0 text-center lg:text-left">All Plants</h1>
        </InViewAnimation>
        <InViewRight>
          <FilterSearch searchText={searchText} handleChange={handleChange} setSearchText={setSearchText} />
        </InViewRight>
      </div>
      <div className="buttons-container">
        {filters.map((category, idx) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={`button ${selectedFilters?.includes(category) ? "active" : ""}`}
            key={`filters-${idx}`}
          >
            {category}
          </button>
        ))}
      </div>
      <InViewRight>
        <div className="py-10 flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14">
            {/* {currentResults?.map((item) => (
              <AllProduct key={item?._id} item={item} />
            ))} */}
            {currentResults.length > 0 ? currentResults.map((item) => (
              <AllProduct key={item._id} item={item} />
            )) : (
              <div className='flex justify-center items-center mx-auto p-10'>
                <h1 className='text-center text-xl font-medium text-lightGreen'>No Result found by "{searchText}"</h1>
              </div>
            )}
          </div>

        </div>
      </InViewRight>
      <Pagination totalPosts={data?.data?.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default AllProducts