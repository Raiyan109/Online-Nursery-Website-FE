import { useAddProductMutation } from "@/redux/features/productApi"
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const AddProduct = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [availableInStock, setAvailableInStock] = useState('')
    const [description, setDescription] = useState('')
    const [addProduct] = useAddProductMutation()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        // No need for id, because you will get from mongodb
        const productDetails = {
            title: title,
            category: category,
            rating: rating,
            price: price,
            image: image,
            availableInStock: availableInStock,
            description: description,
        };
        addProduct(productDetails)
        toast.success('Product added to cart')
    };
    return (
        <div>
            <div className=" rounded-lg shadow relative ">

                <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-4xl font-semibold text-paste">
                        Add A Plant
                    </h3>
                    {/* <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="product-modal">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button> */}
                </div>

                <div className="p-6 space-y-6">
                    <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label className="text-sm font-medium text-paste block mb-2">Title</label>
                                <input type="text" name="product-name" id="product-name"
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Purple Orchid" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="text-sm font-medium text-paste block mb-2">Category</label>
                                <input type="text" name="category" id="category"
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Orchids" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="text-sm font-medium text-paste block mb-2">Rating</label>
                                <input type="number" name="brand" id="brand"
                                    onChange={(e) => setRating(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="5" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="text-sm font-medium text-paste block mb-2">Price</label>
                                <input type="number" name="price" id="price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="$220" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="text-sm font-medium text-paste block mb-2">Image</label>
                                <input type="text" name="image" id="image"
                                    onChange={(e) => setImage(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="https://i.ibb.co/rMj8B7B/orchids.jpg" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label className="text-sm font-medium text-paste block mb-2">Available in stock</label>
                                <input type="number" name="available" id="available"
                                    onChange={(e) => setAvailableInStock(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="20" />
                            </div>
                            <div className="col-span-full">
                                <label className="text-sm font-medium text-paste block mb-2">Product Details</label>
                                <textarea id="product-details" rows={6}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-200 rounded flex">
                            <button className="btn-green-square focus:ring-4 focus:ring-paste font-medium rounded-2xl text-xl px-5 py-2.5 text-center w-full" type="submit">Add</button>
                        </div>
                    </form>
                </div>



            </div>
        </div>
    )
}

export default AddProduct