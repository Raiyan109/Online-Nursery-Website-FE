import { useGetConfigQuery, useGetOrdersQuery } from '@/redux/features/order/orderApi';
import { useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import InjectCheck from './InjectCheck';

const OrderSummary = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSec, setClientSec] = useState("");
    const { data, isLoading, Error } = useGetOrdersQuery(undefined);
    const { data: config } = useGetConfigQuery(undefined);
    const cart = useAppSelector((state) => state.cart)

    useEffect(() => {
        (async () => {
            const res = await axios.get('http://localhost:5000/api/v1/orders/config')
            setStripePromise(loadStripe(res.data.publishableKey));
        })()
    }, [])
    console.log(stripePromise);

    useEffect(() => {
        const createStripe = async () => {
            try {
                const res = await axios.post('http://localhost:5000/api/v1/orders/stripe', {
                    amount: cart.cartTotalAmount
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res.data.data);
                setClientSec(res.data.data);
            } catch (error) {
                console.error("Error creating order", error);
            }
        };


        createStripe();

    }, [])

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret: clientSec,
        appearance,
    };


    return (
        <div className='pt-20'>
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

                    <div className="grid grid-cols-6 gap-6">
                        {data?.data?.map((item) => (
                            <div className="col-span-6 sm:col-span-3">
                                <div className='mb-3'>
                                    <label className="text-xl font-medium text-black block mb-1">Customer Name</label>
                                    <div
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"  >{item.name}</div>
                                </div>
                                <div className='mb-3'>
                                    <label className="text-xl font-medium text-black block mb-1">Customer Phone</label>
                                    <div
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"  >{item.phone}</div>
                                </div>
                                <label className="text-xl font-medium text-black block mb-1">Customer Address</label>
                                <div
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"  >{item.address}</div>
                            </div>
                        ))}

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
                        className="w-full text-center btn-black-square py-3 px-6 font-semibold text-lg transition-all duration-500 rounded-2xl mt-9">Pay Now</button>
                    {clientSec && (
                        <Elements stripe={stripePromise} options={options}>
                            <InjectCheck />
                            {/* <InjectCheck clientSecret={clientSec} /> */}
                        </Elements>
                    )}

                </div>
            </div></div>
    )
}

export default OrderSummary