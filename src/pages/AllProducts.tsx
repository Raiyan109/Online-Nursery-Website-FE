import InViewAnimation from "@/components/InViewAnimation"
import InViewRight from "@/components/InViewRight"
import { useGetProductQuery } from "@/redux/features/productApi"
import AllProduct from "./AllProduct"
import Navbar from "@/components/Navbar"

const AllProducts = () => {
  const { data, error, isLoading } = useGetProductQuery(undefined)

  return (
    <div className="py-32">
      <Navbar />
      <InViewAnimation>
        <h1 className="text-6xl text-white font-bold pb-10 lg:px-28 px-0 text-center lg:text-left">All Plants</h1>
      </InViewAnimation>
      <InViewRight>
        <div className="py-10 flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14">
            {data?.data?.map((item) => (
              <AllProduct key={item?._id} item={item} />
            ))}
          </div>

        </div>
      </InViewRight>
    </div>
  )
}

export default AllProducts