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
import { useState } from "react"
import { useDeleteProductMutation, useGetProductQuery } from "@/redux/features/productApi"
import { Skeleton } from "./ui/skeleton"
import { MdDelete, MdEdit } from "react-icons/md"
import Loading from "./Loading"
import Pagination from "./Pagination"

const ProductTable = () => {

    // States for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(5)

    const { data, error, isLoading } = useGetProductQuery(undefined)
    const [deleteProduct] = useDeleteProductMutation()

    const removeProduct = (id) => {
        console.log(id);
        console.log('from remove product');


        deleteProduct(id)
    }

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
        <div> <Table>
            <TableCaption>
                <Pagination totalPosts={data?.data?.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </TableCaption>
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
                    {currentResults?.map((product) => (
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

                        </TableRow>
                    ))}
                </TableBody>
            )}
        </Table>

        </div>
    )
}

export default ProductTable