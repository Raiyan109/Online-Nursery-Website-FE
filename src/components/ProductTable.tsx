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
import { DialogClose } from "@radix-ui/react-dialog"

const ProductTable = () => {
    // States for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    // States for form
    const [productId, setProductId] = useState('');
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [availableInStock, setAvailableInStock] = useState('')
    const [description, setDescription] = useState('')

    // Redux data
    const { data, error, isLoading, refetch } = useGetProductQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })
    const [deleteProduct] = useDeleteProductMutation()
    const [updateProduct, { isSuccess }] = useUpdateProductMutation()

    // Remove function
    const removeProduct = (id) => {

        deleteProduct(id)
        toast.success('product deleted')
    }

    // Update function
    const handleUpdateProduct = async (e: FormEvent) => {
        e.preventDefault();

        const productDetails = {
            title: title,
            category: category,
            rating: rating,
            price: price,
            image: image,
            availableInStock: availableInStock,
            description: description,
        };

        await updateProduct({ id: productId, ...productDetails });
        toast.success('Product updated')
        refetch();
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
                                <button
                                    className="btn-white-square text-center px-1 py-1 bg-orange hover:bg-orange/90 rounded"
                                    onClick={() => {
                                        setProductId(product._id);
                                        setTitle(product.title);
                                        setCategory(product.category);
                                        setRating(product.rating);
                                        setPrice(product.price);
                                        setImage(product.image);
                                        setAvailableInStock(product.availableInStock);
                                        setDescription(product.description);
                                    }}
                                >
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <MdEdit className="text-xl" />
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] bg-paste border-none">
                                            <DialogHeader>
                                                <DialogTitle>Edit product</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your product here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleUpdateProduct}>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="title" className="text-right">
                                                            Title
                                                        </Label>
                                                        <Input
                                                            id="title"
                                                            value={title}
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
                                                            value={category}
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
                                                            value={rating}
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
                                                            value={price}
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
                                                            value={image}
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
                                                            value={availableInStock}
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
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button type="submit" className="btn-black-square">Save changes</Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </form>
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