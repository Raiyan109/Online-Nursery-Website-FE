import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useDeleteProductMutation, useGetProductQuery } from "@/redux/features/productApi";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaLeaf } from "react-icons/fa6";
import { AiFillFileAdd } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "@/components/Loading";
import { Skeleton } from "@/components/ui/skeleton"


const Dashboard = () => {
  const [products, setProducts] = useState([])
  const { data, error, isLoading } = useGetProductQuery(undefined)
  const [deleteProduct] = useDeleteProductMutation()

  const removeProduct = (id) => {
    console.log(id);
    console.log('from remove product');


    deleteProduct(id)
  }

  if (isLoading) {
    return <div>
      <Skeleton className="w-full h-screen rounded-full" />
    </div>
  }

  return (
    <div className="bg-darkBrown text-slate-100 flex">
      <SideNav />
      <div className="w-full">
        <div className="h-[35px] m-4 rounded border-2 border-dashed border-paste bg-darkBrown"></div>
        <div className=" m-4 rounded border-2 border-dashed border-paste bg-darkBrown">
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
                  <TableRow key={product?._id}>
                    <TableCell className="text-center">
                      <img src={product.image} alt="" className="w-8 h-8 object-contain" />
                    </TableCell>
                    <TableCell className="font-medium text-center">{product.title}</TableCell>
                    <TableCell className="font-medium text-center">{product.price}</TableCell>
                    <TableCell className="font-medium text-center">{product.category}</TableCell>
                    <TableCell className="font-medium flex items-center gap-3 justify-center">
                      <button className="btn-white-square text-center px-1 py-1 bg-orange hover:bg-orange/90 rounded"><MdEdit /></button>
                      <button className="btn-white-square text-center  px-1 py-1 bg-red hover:bg-red/90 rounded">
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <MdDelete />
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-paste border-none">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-red border-none">Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-orange"
                                onClick={() => removeProduct(product._id)}
                              >Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>


                      </button>
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
      <Link to='/'>
        <IoMdArrowRoundBack size={40} className="text-darkBrown mb-5 cursor-pointer hover:text-lightGreen transition-all duration-75" />

      </Link>
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