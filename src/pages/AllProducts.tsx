import InViewAnimation from "@/components/InViewAnimation"
import InViewRight from "@/components/InViewRight"
import { useGetProductQuery } from "@/redux/features/productApi"
import AllProduct from "./AllProduct"
import Navbar from "@/components/Navbar"
import Loading from "@/components/Loading"
import Pagination from "@/components/Pagination"
import { useState } from "react"

const AllProducts = () => {
  // States for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(10)
  const { data, error, isLoading } = useGetProductQuery(undefined)

  if (isLoading) {
    return <div>
      <Loading />
    </div>
  }
  // Logic for pagination
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentResults = data?.data?.slice(firstPostIndex, lastPostIndex)

  return (
    <div className="py-32">
      <Navbar />
      <InViewAnimation>
        <h1 className="text-6xl text-white font-bold pb-10 lg:px-28 px-0 text-center lg:text-left">All Plants</h1>
      </InViewAnimation>
      <InViewRight>
        <div className="py-10 flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14">
            {currentResults?.map((item) => (
              <AllProduct key={item?._id} item={item} />
            ))}
          </div>

        </div>
      </InViewRight>
      <Pagination totalPosts={data?.data?.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default AllProducts