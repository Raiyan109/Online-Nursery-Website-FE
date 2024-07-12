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
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { FormEvent, useState } from "react"
import { useDeleteProductMutation, useGetProductQuery, useUpdateProductMutation } from "@/redux/features/productApi"
import { Skeleton } from "./ui/skeleton"
import { MdDelete, MdEdit } from "react-icons/md"
import Loading from "./Loading"
import Pagination from "./Pagination"
import { toast } from "sonner"

const ProductTable = () => {
    // States for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    // States for form
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [availableInStock, setAvailableInStock] = useState('')
    const [description, setDescription] = useState('')

    // Redux data
    const { data, error, isLoading } = useGetProductQuery(undefined)
    const [deleteProduct] = useDeleteProductMutation()
    const [updateProduct] = useUpdateProductMutation()

    // Remove function
    const removeProduct = (id) => {

        deleteProduct(id)
        toast.success('product deleted')
    }

    // Update function
    const handleUpdateProduct = async (e: FormEvent, id) => {
        e.preventDefault();
        console.log(id);

        const productDetails = {
            title: title,
            category: category,
            rating: rating,
            price: price,
            image: image,
            availableInStock: availableInStock,
            description: description,
        };
        console.log(productDetails);

        await updateProduct({ id, productDetails })
        toast.success('Product updated')
    };

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
                {data?.data.length > 10 && <Pagination totalPosts={data?.data?.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
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
                                <button className="btn-white-square text-center px-1 py-1 bg-orange hover:bg-orange/90 rounded">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            {/* <Button variant="outline">Edit Profile</Button> */}
                                            <MdEdit className="text-xl" />
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] bg-paste border-none">
                                            <DialogHeader>
                                                <DialogTitle>Edit product</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your product here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="title" className="text-right">
                                                        Title
                                                    </Label>
                                                    <Input
                                                        id="title"
                                                        defaultValue={product.title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="category" className="text-right">
                                                        Category
                                                    </Label>
                                                    <Input
                                                        id="category"
                                                        defaultValue={product.category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="rating" className="text-right">
                                                        Rating
                                                    </Label>
                                                    <Input
                                                        id="rating"
                                                        defaultValue={product.rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="price" className="text-right">
                                                        Price
                                                    </Label>
                                                    <Input
                                                        id="price"
                                                        defaultValue={product.price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="image" className="text-right">
                                                        Image
                                                    </Label>
                                                    <Input
                                                        id="image"
                                                        defaultValue={product.image}
                                                        onChange={(e) => setImage(e.target.value)}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="availableInStock" className="text-right">
                                                        Available
                                                    </Label>
                                                    <Input
                                                        id="availableInStock"
                                                        defaultValue={product.availableInStock}
                                                        onChange={(e) => setAvailableInStock(e.target.value)}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="description" className="text-right">
                                                        Description
                                                    </Label>
                                                    <Input
                                                        id="description"
                                                        defaultValue={product.description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" className="btn-black-square" onClick={(e) => handleUpdateProduct(e, product._id)}>Save changes</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </button>

                                <button className="btn-white-square text-center  px-1 py-1 bg-red hover:bg-red/90 rounded">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <MdDelete className="text-xl" />
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