import InViewAnimation from "@/components/InViewAnimation"
import InViewRight from "@/components/InViewRight"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { IoBagHandleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { addToCart, decreaseCart, getTotal, removeFromCart } from "@/redux/features/cart/cartSlice";
import { FormEvent, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { toast } from "sonner";

const Cart = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const cart = useAppSelector((state) => state.cart)
  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTotal())
  }, [cart, dispatch])


  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem))
  }

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem))
  }

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // No need for id, because you will get from mongodb
    const orderDetails = {
      name,
      phone,
      address
    };
    createOrder(orderDetails)
    toast.success('Order created')
    navigate('/order')
  };

  return (
    <>
      <Navbar />
      {cart.cartItems.length === 0 ? (
        <InViewAnimation>
          <div className="py-32 flex flex-col items-center justify-center gap-5">
            <IoBagHandleOutline size={70} className="text-lightGreen" />
            <h1 className="text-6xl text-white font-bold lg:px-28 px-0 text-center lg:text-left">Your cart is empty</h1>
            <h3 className="text-md text-white/60 lg:px-28 px-0 text-center lg:text-left">Please add more plants inside</h3>
            <Link to='/allProducts'>
              <button className="btn-green-rounded text-xl py-3 px-5 rounded-full">Start Shopping</button>
            </Link>
          </div>
        </InViewAnimation>
      ) : (
        <div className="py-32">
          <InViewAnimation>
            <h1 className="text-6xl text-white font-bold pb-10 lg:px-28 px-0 text-center lg:text-left">Cart ({cart.cartTotalQuantity})</h1>
          </InViewAnimation>
          <InViewRight>
            <section
              className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
              <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                <div className="grid grid-cols-12">
                  <div
                    className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                    {/* <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                      <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                      <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">3 Items</h2>
                    </div> */}
                    {/* Cart items header */}
                    <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-paste">
                      <div className="col-span-12 md:col-span-7">
                        <p className="font-normal text-lg leading-8 text-paste">Product Details</p>
                      </div>
                      <div className="col-span-12 md:col-span-5">
                        <div className="grid grid-cols-5">
                          <div className="col-span-3">
                            <p className="font-normal text-lg leading-8 text-paste text-center">Quantity</p>
                          </div>
                          <div className="col-span-2">
                            <p className="font-normal text-lg leading-8 text-paste text-center">Total</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cart Items */}
                    {cart.cartItems?.map((cartItem) => (
                      <div
                        className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-paste group">
                        <div className="w-full md:max-w-[126px]">
                          <img src={cartItem?.image} alt="perfume bottle image"
                            className="mx-auto" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                          <div className="md:col-span-2">
                            <div className="flex flex-col max-[500px]:items-center gap-3">
                              <h6 className="font-semibold text-base leading-7 text-white">{cartItem?.title}</h6>
                              <h6 className="font-normal text-sm leading-7 text-white/80">{cartItem?.category}</h6>
                              <h6 className="font-medium text-base leading-7 text-lightGreen transition-all duration-300 group-hover:text-lightGreen/80">${cartItem?.price}</h6>
                              <button className="btn-green-rounded bg-red hover:bg-red/80 w-20 text-xs" onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                            </div>
                          </div>
                          <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                            <div className="flex items-center h-full">
                              <button
                                className="group rounded-l-xl px-5 py-[18px] border border-paste flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-paste hover:border-paste hover:shadow-paste focus-within:outline-paste" onClick={() => handleDecreaseCart(cartItem)}>

                                <FaMinus className="stroke-white transition-all duration-500 group-hover:stroke-black" />
                              </button>
                              <div className="border-y border-paste outline-none text-white font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-white py-[15px]  text-center bg-transparent">
                                {cartItem.cartQuantity}
                              </div>
                              {/* <input type="text"
                                className="border-y border-paste outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-white py-[15px]  text-center bg-transparent"
                                placeholder="1" /> */}
                              <button
                                className="group rounded-r-xl px-5 py-[18px] border border-paste flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-paste hover:border-paste hover:shadow-paste focus-within:outline-paste" onClick={() => handleIncreaseCart(cartItem)}>
                                <FaPlus className="stroke-white transition-all duration-500 group-hover:stroke-black" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                            <p className="font-bold text-lg leading-8 text-lightGreen text-center transition-all duration-300 group-hover:text-lightGreen/80">${cartItem.price * cartItem.cartQuantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}



                    {/* <div className="flex items-center justify-end mt-8">
                      <button
                        className="flex items-center px-5 py-3 rounded-full gap-2 border-none outline-0 group font-semibold text-lg leading-8 text-indigo-600 shadow-sm shadow-transparent transition-all duration-500 hover:text-indigo-700">
                        Add Coupon Code
                        <svg className="transition-all duration-500 group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                          fill="none">
                          <path
                            d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                            stroke="#4F46E5" stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                      </button>
                    </div> */}
                  </div>
                  <div
                    className=" col-span-12 xl:col-span-4 bg-paste w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                      Order Summary & Customer Details</h2>
                    <div className="mt-8">
                      <div className="flex items-center justify-between pb-6">
                        <p className="font-bold text-2xl leading-8 text-black">{cart.cartTotalQuantity} Items</p>
                        <p className="font-bold text-2xl leading-8 text-black">${cart.cartTotalAmount}</p>
                      </div>
                      {/* Customer details form */}
                      <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label className="text-xl font-medium text-black block mb-2">Customer name</label>
                            <input type="text" name="product-name" id="product-name"
                              onChange={(e) => setName(e.target.value)}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Mr. Abdullah" />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label className="text-xl font-medium text-black block mb-2">Phone number</label>
                            <input type="text" name="phone" id="phone"
                              onChange={(e) => setPhone(e.target.value)}
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="017135474958" />
                          </div>

                          <div className="col-span-full">
                            <label className="text-xl font-medium text-black block mb-2">Address</label>
                            <input id="address"
                              onChange={(e) => setAddress(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Address" />
                          </div>
                        </div>

                        {/* <div className="flex items-center border-b border-gray-200">
                          <button
                            className="w-full text-center btn-black-square py-3 px-6 font-semibold text-lg transition-all duration-500 rounded-2xl mb-4">Apply</button>
                        </div> */}
                        {/* <div className="flex items-center justify-between py-8">
                          <p className="font-medium text-2xl leading-8 text-black">{cart.cartTotalQuantity} Items</p>
                          <p className="font-bold text-2xl leading-8 text-black">${cart.cartTotalAmount}</p>
                        </div> */}
                        <button type="submit"
                          className="w-full text-center btn-black-square py-3 px-6 font-semibold text-lg transition-all duration-500 rounded-2xl mt-9">Checkout</button>
                        {/* bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700 */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </InViewRight>
        </div>
      )}
    </>
  )
}

export default Cart