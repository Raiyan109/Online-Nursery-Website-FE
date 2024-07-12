import { useGetCategoriesQuery } from "@/redux/features/productApi"
import InViewAnimation from "./InViewAnimation"
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import InViewRight from "./InViewRight";

const Category = () => {
  const { data, isLoading } = useGetCategoriesQuery(undefined)

  return (
    <div className="py-32">
      <InViewAnimation>
        <h1 className="text-6xl text-white font-bold pb-10 lg:px-28 px-0 text-center lg:text-left">Most Popular Categories</h1>
      </InViewAnimation>
      <InViewRight>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-32 px-5 lg:px-3">
          {data?.data?.map((item) => (
            <div className="flex flex-col items-center justify-center gap-8" key={item?._id}>
              <div className="rounded-2xl">
                <img src={item?.image} alt="" className="w-96 h-56 object-cover rounded-[100px]" />
              </div>
              <div className="btn-green-rounded text-2xl  py-2 rounded-full max-w-3xl flex justify-center items-center">{item?.category}</div>
            </div>
          ))}
        </div>
      </InViewRight>
      {/* bg-neutral-800 */}
      <div className="">
        {/* <div className="flex h-48 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
            Scroll down
          </span>
        </div> */}

        {/* <div className="flex h-48 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
            Scroll up
          </span>
        </div> */}
      </div>
    </div>
  )
}



export default Category