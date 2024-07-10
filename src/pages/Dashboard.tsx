import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetProductQuery } from "@/redux/features/productApi";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaLeaf } from "react-icons/fa6";
import { AiFillFileAdd } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "@/components/Loading";
import { Skeleton } from "@/components/ui/skeleton"


const Dashboard = () => {
  const [products, setProducts] = useState([])
  const { data, error, isLoading } = useGetProductQuery(undefined)

  if (isLoading) {
    return <div>
      <Skeleton className="w-full h-screen rounded-full" />
    </div>
  }

  return (
    <div className="bg-darkBrown text-slate-100 flex">
      <SideNav />
      <div className="w-full">
        <div className="h-[35px] m-4 rounded border-2 border-dashed border-slate-600 bg-darkBrown"></div>
        <div className="h-[400px] m-4 rounded border-2 border-dashed border-slate-600 bg-darkBrown">
          <Table>
            <TableCaption>A list of your recent products.</TableCaption>
            {error && <TableCaption>Error: {error.message}</TableCaption>}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">Image</TableHead>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {!isLoading && !error && data && data?.data?.length > 0 && (
              <TableBody>
                {data?.data?.map((product) => (
                  <TableRow>
                    <TableCell className="text-center">
                      <img src={product.image} alt="" className="w-8 h-8 object-contain" />
                    </TableCell>
                    <TableCell className="font-medium text-center">{product.title}</TableCell>
                    <TableCell className="font-medium text-center">{product.price}</TableCell>
                    <TableCell className="font-medium text-center">{product.category}</TableCell>
                    <TableCell className="font-medium flex items-center gap-3 justify-center">
                      <button className="btn-white-square text-center px-1 py-1 bg-orange hover:bg-orange/90 rounded"><MdEdit /></button>
                      <button className="btn-white-square text-center  px-1 py-1 bg-red hover:bg-red/90 rounded"><MdDelete /></button>
                    </TableCell>
                    {/* <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>

        </div>
      </div>
    </div>
  )
}

const SideNav = () => {
  const [selected, setSelected] = useState(0);

  return (
    // NOTE: In prod, you'd likely set height to h-screen and fix to the viewport
    // h-[500px]
    <nav className="h-screen w-fit bg-paste p-4 flex flex-col items-center gap-2">
      {/* Temp logo from https://logoipsum.com/ */}
      <svg
        width="40"
        height="28"
        viewBox="0 0 40 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.98578 4.11462L0 14C1.99734 15.9773 4.27899 17.6437 6.76664 18.9474C7.45424 20.753 8.53203 22.4463 10 23.8995C15.5229 29.3668 24.4772 29.3668 30 23.8995C31.468 22.4463 32.5458 20.753 33.2334 18.9473C35.721 17.6437 38.0027 15.9773 40 14L30.0223 4.12266C30.0149 4.11527 30.0075 4.10788 30 4.1005C24.4772 -1.36683 15.5229 -1.36683 10 4.1005C9.99527 4.10521 9.99052 4.10991 9.98578 4.11462ZM29.0445 20.7309C26.1345 21.7031 23.0797 22.201 20 22.201C16.9203 22.201 13.8656 21.7031 10.9556 20.7309C11.2709 21.145 11.619 21.5424 12 21.9196C16.4183 26.2935 23.5817 26.2935 28 21.9196C28.381 21.5424 28.7292 21.145 29.0445 20.7309ZM12.2051 5.8824C12.9554 6.37311 13.7532 6.79302 14.588 7.13536C16.3038 7.83892 18.1428 8.20104 20 8.20104C21.8572 8.20104 23.6962 7.83892 25.412 7.13536C26.2468 6.79302 27.0446 6.3731 27.795 5.88238C23.4318 1.77253 16.5682 1.77254 12.2051 5.8824Z"
          fill="#FFFFFF"
        ></path>
      </svg>
      <NavItem selected={selected === 0} id={0} setSelected={setSelected} to='/dashboard'>
        <FaLeaf />
      </NavItem>
      <NavItem selected={selected === 1} id={1} setSelected={setSelected} to='/dashboard/addProduct'>
        <AiFillFileAdd />
      </NavItem>

    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected, to }) => {
  return (
    <Link to={to}>
      <motion.button
        className="p-3 text-xl bg-darkBrown hover:bg-darkBrown/90 rounded-md transition-colors relative"
        onClick={() => setSelected(id)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="block relative z-10">{children}</span>
        <AnimatePresence>
          {selected && (
            <motion.span
              className="absolute inset-0 rounded-md bg-lightGreen z-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            ></motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </Link>
  );
};

export default Dashboard